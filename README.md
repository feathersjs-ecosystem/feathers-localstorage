# feathers-localstorage

[![Greenkeeper badge](https://badges.greenkeeper.io/feathersjs/feathers-localstorage.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/feathersjs/feathers-localstorage.png?branch=master)](https://travis-ci.org/feathersjs/feathers-localstorage)
[![Code Climate](https://codeclimate.com/github/feathersjs/feathers-localstorage.png)](https://codeclimate.com/github/feathersjs/feathers-localstorage)
[![Test Coverage](https://codeclimate.com/github/feathersjs/feathers-localstorage/badges/coverage.svg)](https://codeclimate.com/github/feathersjs/feathers-localstorage/coverage)
[![Dependency Status](https://img.shields.io/david/feathersjs/feathers-localstorage.svg?style=flat-square)](https://david-dm.org/feathersjs/feathers-localstorage)
[![Download Status](https://img.shields.io/npm/dm/feathers-localstorage.svg?style=flat-square)](https://www.npmjs.com/package/feathers-localstorage)
[![Slack Status](http://slack.feathersjs.com/badge.svg)](http://slack.feathersjs.com)

> A client side service based on feathers-memory that persists to LocalStorage or AsyncStorage

## Installation

```bash
npm install feathers-localstorage --save
```

## Documentation

Please refer to the [Feathers database adapter documentation](https://docs.feathersjs.com/api/databases/common.html) for more details or directly at:

- [LocalStorage/Asyncstorage](https://docs.feathersjs.com/api/databases/localstorage.html) - The detailed documentation for this adapter
- [Extending](https://docs.feathersjs.com/api/databases/common.html#extending-adapters) - How to extend a database adapter
- [Pagination](https://docs.feathersjs.com/api/databases/common.html#pagination) - How to use pagination
- [Querying and Sorting](https://docs.feathersjs.com/api/databases/querying.html) - The common adapter querying mechanism and sorting for the database adapter

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

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).
