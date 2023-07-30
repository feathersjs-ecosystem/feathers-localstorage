const { MemoryService } = require('@feathersjs/memory');

const usedKeys = [];

class LocalStorage extends MemoryService {
  constructor (options = {}) {
    super(options);
    this._storageKey = options.name || 'feathers';
    this._storage = options.storage;
    this._store = options.store || {};
    this._throttle = options.throttle || 200;
    this._reuseKeys = options.reuseKeys || false;

    if (usedKeys.indexOf(this._storageKey) === -1) {
      usedKeys.push(this._storageKey);
    } else {
      if (!this._reuseKeys) {
        throw new Error(`The storage name '${this._storageKey}' is already in use by another instance.`);
      }
    }

    this._isInitialized = false;
    this.ready();
  }

  ready () {
    if (!this._isInitialized) {
      if (Object.keys(this._store).length > 0) {
        this._storage.setItem(this._storageKey, JSON.stringify(this._store));
        this.store = this._store;
      }

      const store = JSON.parse(this._storage.getItem(this._storageKey) || '{}');
      this.store = store;
      const keys = Object.keys(store);

      this._uId = 1;

      const last = keys.length > 0 ? store[keys[keys.length - 1]] : { [this.id]: 1 };

      // Current id is the id of the last item
      this._uId = typeof last[this.id] !== 'undefined' ? last[this.id] + 1 : this._uId;

      // We only want too initialize once
      this._isInitialized = true;
    }
  }

  flush (data) {
    if (!this._timeout) {
      this._timeout = setTimeout(() => {
        this._storage.setItem(this._storageKey, JSON.stringify(this.store));
        delete this._timeout;
      }, this._throttle);
    }

    return data;
  }

  execute (method, ...args) {
    this.ready();
    return super[method](...args);
  }

  _find (...args) {
    return this.execute('_find', ...args);
  }

  _get (...args) {
    return this.execute('_get', ...args);
  }

  _create (...args) {
    return this.execute('_create', ...args)
      .then(data => this.flush(data));
  }

  _patch (...args) {
    return this.execute('_patch', ...args)
      .then(data => this.flush(data));
  }

  _update (...args) {
    return this.execute('_update', ...args)
      .then(data => this.flush(data));
  }

  _remove (...args) {
    return this.execute('_remove', ...args)
      .then(data => this.flush(data));
  }
}

module.exports = function init (options) {
  return new LocalStorage(options);
};

// module.exports.Service = MemoryService;
