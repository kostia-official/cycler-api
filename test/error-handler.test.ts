import supertest from 'supertest';
import faker from 'faker';
import * as sinon from 'sinon';
import app from '../src/app';
import * as GetUserId from '../src/helpers/getUserId';

const request = supertest(app);

describe('error handler', () => {
  let configureAclStub;

  beforeAll(() => {
    sinon.stub(GetUserId, 'getUserId').returns('123');
  });

  it('should respond with BadRequest for validation errors', async () => {
    const cycle = {
      name: faker.random.word(),
      periodicity: 'daily',
      fieldsTemplates: [{}]
    };
    await request
      .post('/cycles')
      .send(cycle)
      .expect(400);
  });
});
