import app from '../../src/app';
import faker from 'faker';
import { Periodicity } from '../../src/models/cycles.model';
import { FieldType } from '../../src/models/fields-templates.model';
import * as sinon from 'sinon';
import * as GetUserId from '../../src/helpers/getUserId';

describe("'cycles' service", () => {
  let Cycles;

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

  beforeAll(() => {
    sinon.stub(GetUserId, 'getUserId').returns('123');
    Cycles = app.service('cycles');
  });

  it('should create a cycle with populated fields templates', async () => {
    const result = await Cycles.create(cycle);

    expect(result._id).toBeTruthy();

    expect(result.fieldsTemplates).toHaveLength(1);
    expect(result.fieldsTemplates[0]._id).toBeTruthy();
    expect(result.fieldsTemplates[0].name).toBe(cycle.fieldsTemplates[0].name);
  });

  it('should patch a cycle with populated fields templates', async () => {
    const created = await Cycles.create(cycle);
    const newName = faker.random.words();
    const newFieldTemplate = {
      type: FieldType.Text,
      name: faker.random.word()
    };
    const result = await Cycles.patch(created._id, {
      name: newName,
      fieldsTemplates: [...created.fieldsTemplates, newFieldTemplate]
    });

    expect(result._id).toBeTruthy();
    expect(result.name).toBe(newName);

    expect(result.fieldsTemplates).toHaveLength(2);
    expect(result.fieldsTemplates[0]._id).toBeTruthy();
    expect(result.fieldsTemplates[0].name).toBe(cycle.fieldsTemplates[0].name);
    expect(result.fieldsTemplates[1]._id).toBeTruthy();
    expect(result.fieldsTemplates[1].name).toBe(newFieldTemplate.name);
  });

  it('should find a cycle with populated fields templates', async () => {
    const { _id } = await Cycles.create(cycle);
    const result = await Cycles.find({
      query: { _id, $populate: ['fields-templates'] }
    });

    expect(result).toHaveLength(1);

    expect(result[0]._id).toBeTruthy();
    expect(result[0].fieldsTemplates).toHaveLength(1);
    expect(result[0].fieldsTemplates[0]._id).toBeTruthy();
  });
});
