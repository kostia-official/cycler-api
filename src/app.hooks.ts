// Application hooks that run for every service
// Don't remove this comment. It's needed to format import lines nicely.

import { errorHandler } from './hooks/errorHandler';
import { includeUserId } from './hooks/userIdToData';

export default {
  before: {
    all: [includeUserId()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [errorHandler],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
