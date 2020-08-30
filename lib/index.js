const { Service } = require('feathers-memory');

const usedKeys = [];

class LocalStorage extends Service {
  constructor (options = {}) {
    super(options);
    this._storageKey = options.name || 'feathers';
    this._storage = options.storage || (typeof window !== 'undefined' && window.localStorage);
    this._throttle = options.throttle || 200;
    this._updated = true;
    this.store = null;

    if (!this._storage) {
      throw new Error('The `storage` option needs to be provided');
    }

    if (usedKeys.indexOf(this._storageKey) === -1) {
      usedKeys.push(this._storageKey);
    } else {
      throw new Error(`The storage name '${this._storageKey}' is already in use by another instance.`);
    }
  }

  ready () {
    if (!this.store) {
      return Promise.resolve(this._storage.getItem(this._storageKey))
        .then(str => JSON.parse(str || '{}'))
        .then(store => {
          const keys = Object.keys(store);
          const last = store[keys[keys.length - 1]];

          // Current id is the id of the last item
          this._uId = (keys.length && typeof last[this.id] !== 'undefined') ? last[this.id] + 1 : this._uId;

          return (this.store = store);
        });
    }

    return Promise.resolve(this.store);
  }

  flush (data) {
    if (!this._timeout) {
      this._timeout = setTimeout(() => {
        if (this._updated) {
          this._storage.setItem(this._storageKey, JSON.stringify(this.store));
          this._updated = false;
        }
        delete this._timeout;
      }, this._throttle);
    }

    return data;
  }

  execute (method, ...args) {
    return this.ready()
      .then(() => {
        this._updated = true;
        return super[method](...args);
      });
  }

  find (...args) {
    return this.execute('find', ...args);
  }

  get (...args) {
    return this.execute('get', ...args);
  }

  create (...args) {
    return this.execute('create', ...args)
      .then(data => this.flush(data));
  }

  patch (...args) {
    return this.execute('patch', ...args)
      .then(data => this.flush(data));
  }

  update (...args) {
    return this.execute('update', ...args)
      .then(data => this.flush(data));
  }

  remove (...args) {
    return this.execute('remove', ...args)
      .then(data => this.flush(data));
  }
}

module.exports = function init (options) {
  return new LocalStorage(options);
};

module.exports.Service = Service;
