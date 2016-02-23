import { Service } from 'feathers-memory';
import debounce from 'debounce';

class LocalStorage extends Service {
  constructor(options = {}) {
    super(options);
    this.storageKey = options.name || 'feathers';
    this.storage = options.storage || window.localStorage;
    this.store = JSON.parse(this.storage.getItem(this.storageKey) || '{}');
    this.write = debounce(() => 
      this.storage.setItem(this.storageKey, JSON.stringify(this.store)),
      options.throttle || 100
    );
  }
  
  flush(data) {
    this.write();
    return data;
  }
  
  create(... args) {
    return super.create(... args).then(data => {
      return this.flush.call(this, data);
    });
  }
  
  patch(... args) {
    return super.patch(... args).then(data => {
      return this.flush.call(this, data);
    });
  }
  
  update(... args) {
    return super.update(... args).then(data => {
      return this.flush.call(this, data);
    });
  }
  
  remove(... args) {
    return super.remove(... args).then(data => {
      return this.flush.call(this, data);
    });
  }
}

export default function init(options) {
  return new LocalStorage(options);
}

init.Service = Service;
