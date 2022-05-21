// TypeScript Version: 3.7
// import { Params, Paginated, Id, NullableId } from '@feathersjs/feathers';

import { Service as MemoryService, MemoryServiceOptions, MemoryServiceStore } from 'feathers-memory';

export interface LocalStorageServiceOptions extends MemoryServiceOptions {
  name: string;
  throttle: number;
  strictStorage: boolean;
}

export class Service<T = any> extends MemoryService<T> {
  constructor(options?: Partial<LocalStorageServiceOptions>);

  ready(): Promise<MemoryServiceStore>;
  flush(data?: any): any;
  setStorage(store: MemoryServiceStore): MemoryServiceStore;
  getStorage(id?: any): MemoryServiceStore | any;
}

declare const localstorage: ((config?: Partial<any>) => Service);
export default localstorage;
