# feathers-localstorage

[![Greenkeeper badge](https://badges.greenkeeper.io/feathersjs-ecosystem/feathers-localstorage.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/feathersjs-ecosystem/feathers-localstorage.png?branch=master)](https://travis-ci.org/feathersjs-ecosystem/feathers-localstorage)
[![Dependency Status](https://img.shields.io/david/feathersjs-ecosystem/feathers-localstorage.svg?style=flat-square)](https://david-dm.org/feathersjs-ecosystem/feathers-localstorage)
[![Download Status](https://img.shields.io/npm/dm/feathers-localstorage.svg?style=flat-square)](https://www.npmjs.com/package/feathers-localstorage)

[feathers-localstorage](https://github.com/feathersjs-ecosystem/feathers-localstorage/) is a database service adapter that extends [feathers-memory](./memory.md) and stores data in [localStorage](https://developer.mozilla.org/en/docs/Web/API/Window/localStorage) in the browser or [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage.html) in React Native.

```bash
$ npm install --save feathers-localstorage
```

> __Important:__ `feathers-localstorage` implements the [Feathers Common database adapter API](https://docs.feathersjs.com/api/databases/common.html) and [querying syntax](https://docs.feathersjs.com/api/databases/querying.html).


## API

### `service(options)`

Returns a new service instance initialized with the given options.

```js
const service = require('feathers-localstorage');

app.use('/messages', service({
  storage: window.localStorage || AsyncStorage
}));
app.use('/messages', service({ storage, id, startId, name, store, paginate }));
```

__Options:__

- `storage` (**required**) - The local storage engine. You can pass in the browsers `window.localStorage`, React Native's `AsyncStorage` or a NodeJS localstorage module.
- `id` (*optional*, default: `'id'`) - The name of the id field property.
- `startId` (*optional*, default: `0`) - An id number to start with that will be incremented for new record.
- `name` (*optional*, default: `'feathers'`) - The key to store data under in local or async storage.
- `store` (*optional*) - An object with id to item assignments to pre-initialize the data store
- `events` (*optional*) - A list of [custom service events](https://docs.feathersjs.com/api/events.html#custom-events) sent by this service
- `paginate` (*optional*) - A [pagination object](https://docs.feathersjs.com/api/databases/common.html#pagination) containing a `default` and `max` page size


## Example

See the [clients](https://docs.feathersjs.com/api/client.html) chapter for more information about using Feathers in the browser and React Native.

### Browser

```html
<script type="text/javascript" src="socket.io/socket.io.js"></script>
<script type="text/javascript" src="//unpkg.com/@feathersjs/client@^3.0.0/dist/feathers.js"></script>
<script type="text/javascript" src="//unpkg.com/feathers-localstorage@^2.0.0/dist/localstorage.js"></script>
<script type="text/javascript">
  var service = feathers.localstorage({
    storage: window.localStorage
  });
  var app = feathers().use('/messages', service);

  var messages = app.service('messages');

  messages.on('created', function(message) {
    console.log('Someone created a message', message);
  });

  messages.create({
    text: 'Message created in browser'
  });
</script>
```

### React Native

```bash
$ npm install @feathersjs/feathers feathers-localstorage --save
```

```js
import React from 'react-native';
import feathers from '@feathersjs/feathers';
import localstorage from 'feathers-localstorage';

const { AsyncStorage } = React;

const app = feathers()
  .use('/messages', localstorage({ storage: AsyncStorage }));

const messages = app.service('messages');

messages.on('created', function(message) {
  console.log('Someone created a message', message);
});

messages.create({
  text: 'Message from React Native'
});
```

## License

Copyright (c) 2017

Licensed under the [MIT license](LICENSE).
