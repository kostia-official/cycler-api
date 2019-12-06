import { populateManyToMany } from '../../hooks/populateManyToMany';
import { populateBeforeCreate } from '../../hooks/populateBeforeCreate';
import { populateBeforePatch } from '../../hooks/populateBeforePatch';
import { HookContext } from '@feathersjs/feathers';

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      populateBeforeCreate({
        fieldInMain: 'fieldsTemplates',
        relatedService: 'fieldsTemplates'
      })
    ],
    update: [
      populateBeforePatch({
        fieldInMain: 'fieldsTemplates',
        relatedService: 'fieldsTemplates'
      })
    ],
    patch: [
      populateBeforePatch({
        fieldInMain: 'fieldsTemplates',
        relatedService: 'fieldsTemplates'
      })
    ],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [populateManyToMany({ mainTable: 'cycles', relatedTable: 'fieldsTemplates' })],
    update: [populateManyToMany({ mainTable: 'cycles', relatedTable: 'fieldsTemplates' })],
    patch: [populateManyToMany({ mainTable: 'cycles', relatedTable: 'fieldsTemplates' })],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
