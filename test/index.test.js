const { base } = require('feathers-service-tests');
const errors = require('feathers-errors');
const feathers = require('feathers');
const assert = require('assert');
const storage = require('localstorage-memory');

const service = require('../lib');

describe('Feathers Localstorage Service', () => {
  beforeEach(() => storage.clear());

  const events = [ 'testing' ];
  const app = feathers()
    .use('/people', service({ events, storage }))
    .use('/people-customid', service({
      id: 'customid', events, storage
    }));

  it('is CommonJS compatible', () => {
    assert.equal(typeof require('../lib'), 'function');
  });

  it('loads and sets data in storage', () => {
    const name = 'test-storage';

    storage.setItem(name, '{ "0": { "id": 0, "text": "test 0" } }');

    const app = feathers()
      .use('/messages', service({ name, storage }));
    const messageService = app.service('messages');

    return messageService.create({
      text: 'testing 1'
    }).then(() => messageService.create({
      text: 'testing 2'
    })).then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const data = JSON.parse(storage.getItem(name));
          assert.deepEqual(data, {
            0: {
              id: 0,
              text: 'test 0'
            },
            1: {
              id: 1,
              text: 'testing 1'
            },
            2: {
              id: 2,
              text: 'testing 2'
            }
          });
          resolve();
        }, 250);
      });
    }).then(() => {
      return messageService.remove(0)
        .then(() => messageService.remove(1));
    }).then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const data = JSON.parse(storage.getItem(name));
          assert.deepEqual(data, {
            2: {
              id: 2,
              text: 'testing 2'
            }
          });
          resolve();
        }, 250);
      });
    });
  });

  it('gets data in storage', done => {
    const name = 'test-storage';

    storage.setItem(name, '{ "0": { "id": 0, "text": "test 0" } }');

    const app = feathers()
      .use('/messages', service({ name, storage }));
    const messageService = app.service('messages');

    messageService.get(0).then((data) => {
      assert.deepEqual(data, {
        id: 0,
        text: 'test 0'
      });
    }).then(() => {
      return messageService.find().then((data) => {
        assert.deepEqual(data, {
          0: {
            id: 0,
            text: 'test 0'
          }
        });
      });
    }).then(done, done);
  });

  base(app, errors);
  base(app, errors, 'people-customid', 'customid');
});
