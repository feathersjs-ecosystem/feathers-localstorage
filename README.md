# feathers-localstorage

[![Build Status](https://travis-ci.org/feathersjs/feathers-localstorage.png?branch=master)](https://travis-ci.org/feathersjs/feathers-localstorage)

> A client side service based on feathers-memory that persists to LocalStorage or AsyncStorage

## Installation

```bash
npm install feathers-localstorage --save
```

## Documentation

Please refer to the [Feathers database adapter documentation](http://docs.feathersjs.com/databases/readme.html) for more details or directly at:

- [In Memory](http://docs.feathersjs.com/databases/localstorage.html) - The detailed documentation for this adapter
- [Extending](http://docs.feathersjs.com/databases/extending.html) - How to extend a database adapter
- [Pagination and Sorting](http://docs.feathersjs.com/databases/pagination.html) - How to use pagination and sorting for the database adapter
- [Querying](http://docs.feathersjs.com/databases/querying.html) - The common adapter querying mechanism

## Complete Example

Here is an example of a Feathers server with a `messages` localstorage service that supports pagination. It uses the node module `localstorage-memory`.

```js
var feathers = require('feathers');
var bodyParser = require('body-parser');
var rest = require('feathers-rest');
var socketio = require('feathers-socketio');
var localstorage = require('feathers-localstorage');
var storage = require('localstorage-memory');

// Create a feathers instance.
const app = feathers()
  // Enable REST services
  .configure(rest())
  // Enable Socket.io services
  .configure(socketio())
  // Turn on JSON parser for REST services
  .use(bodyParser.json())
  // Turn on URL-encoded parser for REST services
  .use(bodyParser.urlencoded({ extended: true }));

// Create an in-memory localstorage Feathers service with a default page size of 2 items and a maximum size of 4
app.use('/messages', localstorage({
  storage: storage,
  paginate: {
    default: 2,
    max: 4
  }
}));

// Create a dummy Message
app.service('messages').create({
  text: 'Server message',
  read: false
}).then(function(message) {
  console.log('Created message', message);
});

// Start the server.
var port = 3030;

app.listen(port, function() {
  console.log(`Feathers server listening on port ${port}`);
});
```

You can run this example with `npm start` from the cloned repository and going to [localhost:3030/messages](http://localhost:3030/messages). You will see the test Message that we created at the end of that file.

## Changelog

__0.2.0__
- `get` and `find` methods were not waiting for store to be ready
- `create` will not throw a `Conflict` error if id exists anymore. Instead it updates more like a cache and localstorage is expected to work.

__0.1.0__

- Initial release
- Supports passing [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage.html) in React Native as `storage`
- Supports passing [localstorage-memory](https://www.npmjs.com/package/localstorage-memory) in NodeJS as `storage`

## License

Copyright (c) 2015

Licensed under the [MIT license](LICENSE).
