// TypeScript Version: 3.7
// import { Params, Paginated, Id, NullableId } from '@feathersjs/feathers';

import { MemoryService, MemoryServiceOptions, MemoryServiceStore } from '@feathersjs/memory';

export interface LocalStorageServiceOptions extends MemoryServiceOptions {
  name: string;
  throttle: number;
}

export class Service<T = any> extends MemoryService<T> {
  constructor(options?: Partial<LocalStorageServiceOptions>);

  ready(): Promise<MemoryServiceStore<T>>;
  flush(data?: any): any;
}

declare const localstorage: ((config?: Partial<any>) => Service);
export default localstorage;
