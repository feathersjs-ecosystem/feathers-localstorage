import { Service } from 'feathers-memory';
import debounce from 'lodash/debounce';

class LocalStorage extends Service {
  constructor(options = {}) {
    super(options);
    this.storageKey = options.name || 'feathers';
    this.storage = options.storage || window.LocalStorage;
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
    return super.create(... args).then(this.flush);
  }
  
  patch(... args) {
    return super.patch(... args).then(this.flush);
  }
  
  update(... args) {
    return super.update(... args).then(this.flush);
  }
  
  remove(... args) {
    return super.remove(... args).then(this.flush);
  }
}

export default function init(options) {
  return new LocalStorage(options);
}

init.Service = Service;
