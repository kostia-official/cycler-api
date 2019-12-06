import app from '../../src/app';
import faker from 'faker';
// @ts-ignore
import moment from 'moment';
import { Periodicity } from '../../src/models/cycles.model';
import { FieldType } from '../../src/models/fields-templates.model';
import * as GetUserId from '../../src/helpers/getUserId';
import * as sinon from 'sinon';

const cycle = {
  name: faker.random.word(),
  periodicity: Periodicity.Day,
  fieldsTemplates: [
    {
      type: FieldType.Text,
      name: faker.random.word()
    }
  ]
};

describe("'iterations' service", () => {
  let Iterations;
  let Fields;
  let Cycles;

  let fieldTemplateRecord;
  let cycleRecord;

  beforeAll(async () => {
    sinon.stub(GetUserId, 'getUserId').returns('123');

    Iterations = app.service('iterations');
    Cycles = app.service('cycles');
    Fields = app.service('fields');

    cycleRecord = await Cycles.create(cycle);
    fieldTemplateRecord = cycleRecord.fieldsTemplates[0];
  });

  describe('create without specific date', () => {
    it('should create an iteration', async () => {
      const today = moment()
        .startOf(Periodicity.Day)
        .toISOString();
      const result = await Iterations.create({
        cycleId: cycleRecord._id,
        date: today
      });

      expect(String(result.cycleId)).toBe(String(cycleRecord._id));
      expect(moment(result.date).toISOString()).toBe(today);
    });
  });

  describe('find', () => {
    let cycle;
    let createdIteration;
    let createdField;

    beforeAll(async () => {
      cycle = {
        date: new Date(),
        cycleId: cycleRecord._id
      };

      createdIteration = await Iterations.create(cycle);
      createdField = await Fields.create({
        iterationId: createdIteration._id,
        fieldTemplateId: fieldTemplateRecord._id
      });
    });

    it('should find with populated fields', async () => {
      const [result] = await Iterations.find({
        query: { _id: createdIteration._id, $populate: ['fields'] }
      });

      expect(result._id).toBeTruthy();
      expect(String(result.cycleId)).toBe(String(cycleRecord._id));

      expect(result.fields).toHaveLength(1);
      expect(result.fields[0]._id).toBeTruthy();
      expect(String(result.fields[0].iterationId)).toBe(String(result._id));
      expect(String(result.fields[0].fieldTemplateId)).toBe(String(fieldTemplateRecord._id));
    });
  });
});
