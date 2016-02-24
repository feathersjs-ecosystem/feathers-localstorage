/*jshint expr: true*/

import { base, example } from 'feathers-service-tests';
import errors from 'feathers-errors';
import feathers from 'feathers';
import assert from 'assert';
import server from './test-app';
import service from '../src';
import localstorage from 'localstorage-memory';

const _ids = {};
const app = feathers().use('/people', service({
  storage: localstorage
}));
const people = app.service('people');

function clean() {
  people._uId = 0;
  people.store = {};
}

describe('Feathers Localstorage Service', () => {
  before(clean);
  after(clean);

  beforeEach(done => {
    people.create({
      name: 'Doug',
      age: 32
    }).then(data => {
      _ids.Doug = data.id;
      done();
    }, done);
  });

  afterEach(done => {
    const doneNow = () => done();
    people.remove(_ids.Doug).then(doneNow, doneNow);
  });

  it('is CommonJS compatible', () => {
    assert.equal(typeof require('../lib'), 'function');
  });

  it('stores our data in memory', () => {
    const person = people.store[_ids.Doug];
    assert.equal(person.name, 'Doug');
  });

  it('persists data to localstorage', done => {
    // we debounce writing data to localstorage so we need to 
    // wait for it to actually be written.
    setTimeout(function() {
      const data = JSON.parse(people.storage.getItem(people.storageKey));
      console.log(data);
      const person = data[_ids.Doug];
      assert.equal(person.name, 'Doug');
      done();
    }, 1000);
  });

  it('can be pre-seaded with data in localstorage', () => {
    const data = { feathers: 'awesome' };

    localstorage.setItem('test', JSON.stringify(data));

    let s = service({
      name: 'test',
      storage: localstorage
    });

    assert.deepEqual(s.store, data);

    localstorage.removeItem('test');
  });

  base(people, _ids, errors);
});

describe('Localstorage service example test', () => {
  after(done => server.close(() => done()));

  example();
});
