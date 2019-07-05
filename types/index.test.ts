import { default as createService, Service } from 'feathers-localstorage';

const service1 = createService();
const service2 = new Service({
  name: 'mykey',
  throttle: 400
});

service1._find({});

service2.ready().then(() => service2.flush());
