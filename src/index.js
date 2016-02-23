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
    return super.create(... args).then(data => this.flush(data));
  }
  
  patch(... args) {
    return super.patch(... args).then(data => this.flush(data));
  }
  
  update(... args) {
    return super.update(... args).then(data => this.flush(data));
  }
  
  remove(... args) {
    return super.remove(... args).then(data => this.flush(data));
  }
}

export default function init(options) {
  return new LocalStorage(options);
}

init.Service = Service;
