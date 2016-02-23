var feathers = require('feathers');
var bodyParser = require('body-parser');
var rest = require('feathers-rest');
var socketio = require('feathers-socketio');
var localstorage = require('../lib');
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

// Create an in-memory localstorage Feathers service with a default page size of 2 items
// and a maximum size of 4
app.use('/messages', localstorage({
  storage: storage,
  paginate: {
    default: 2,
    max: 4
  }
}));

// Start the server
module.exports = app.listen(3030);

console.log('Feathers Message localstorage service running on 127.0.0.1:3030');
