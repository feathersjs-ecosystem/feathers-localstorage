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
  localstorage.removeItem('feathers');
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
  
  it('loads and sets data in storage', done => {
    const name = 'test-storage';
    
    localstorage.setItem(name, '{ "0": { "id": 0, "text": "test 0" } }');
    
    const app = feathers()
      .use('/messages', service({
        name,
        storage: localstorage
      }));
    const messageService = app.service('messages');
      
    messageService.create({
      text: 'testing 1'
    }).then(() => messageService.create({
      text: 'testing 2'
    })).then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          
          const data = JSON.parse(localstorage.getItem(name));
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
          
          const data = JSON.parse(localstorage.getItem(name));
          assert.deepEqual(data, {
            2: {
              id: 2,
              text: 'testing 2'
            }
          });
          resolve();
        }, 250);
      });
    }).then(done, done);
  });

  base(people, _ids, errors);
});

describe('Localstorage service example test', () => {
  after(done => server.close(() => done()));

  example();
});
