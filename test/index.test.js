const adapterTests = require('@feathersjs/adapter-tests');
const errors = require('@feathersjs/errors');
const feathers = require('@feathersjs/feathers');
const assert = require('assert');
const storage = require('localstorage-memory');

const service = require('../lib');
const testSuite = adapterTests([
  '.options',
  '.events',
  '._get',
  '._find',
  '._create',
  '._update',
  '._patch',
  '._remove',
  '.get',
  '.get + $select',
  '.get + id + query',
  '.get + NotFound',
  '.find',
  '.remove',
  '.remove + $select',
  '.remove + id + query',
  '.remove + multi',
  '.update',
  '.update + $select',
  '.update + id + query',
  '.update + NotFound',
  '.patch',
  '.patch + $select',
  '.patch + id + query',
  '.patch multiple',
  '.patch multi query',
  '.patch + NotFound',
  '.create',
  '.create + $select',
  '.create multi',
  'internal .find',
  'internal .get',
  'internal .create',
  'internal .update',
  'internal .patch',
  'internal .remove',
  '.find + equal',
  '.find + equal multiple',
  '.find + $sort',
  '.find + $sort + string',
  '.find + $limit',
  '.find + $limit 0',
  '.find + $skip',
  '.find + $select',
  '.find + $or',
  '.find + $in',
  '.find + $nin',
  '.find + $lt',
  '.find + $lte',
  '.find + $gt',
  '.find + $gte',
  '.find + $ne',
  '.find + $gt + $lt + $sort',
  '.find + $or nested + $sort',
  '.find + paginate',
  '.find + paginate + $limit + $skip',
  '.find + paginate + $limit 0',
  '.find + paginate + params'
]);

describe('Feathers Localstorage Service', () => {
  beforeEach(() => storage.clear());

  const events = [ 'testing' ];
  const app = feathers()
    .use('/people', service({ events, storage, name: 'test-storage-1' }))
    .use('/people-customid', service({
      id: 'customid', events, storage, name: 'test-storage-2'
    }));

  it('is CommonJS compatible', () => {
    assert.strictEqual(typeof require('../lib'), 'function');
  });

  it('loads and sets data in storage', () => {
    const name = 'test-storage-3';

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
          assert.deepStrictEqual(data, {
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
          assert.deepStrictEqual(data, {
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
    const name = 'test-storage-4';

    storage.setItem(name, '{ "0": { "id": 0, "text": "test 0" } }');

    const app = feathers()
      .use('/messages', service({ name, storage }));
    const messageService = app.service('messages');

    messageService.get(0).then((data) => {
      assert.deepStrictEqual(data, {
        id: 0,
        text: 'test 0'
      });
    }).then(() => {
      return messageService.find().then((data) => {
        assert.deepStrictEqual(data, [{
          id: 0,
          text: 'test 0'
        }]);
      });
    }).then(done, done);
  });

  it('throws on name reuse', done => {
    const name = 'test-storage-5';

    assert.throws(() => {
      service({ storage, name });
      service({ storage, name });
    });

    done();
  });

  testSuite(app, errors, 'people');
  testSuite(app, errors, 'people-customid', 'customid');
});
