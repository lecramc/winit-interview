// stores/models/Attorney.js
import { types } from 'mobx-state-tree';

const Attorney = types
  .model('Attorney', {
    _id: types.identifier,
    enabled: types.optional(types.boolean, false),
    name: types.string,
    email: types.string,
    phone: types.maybe(types.string),
    address: types.maybe(types.string),
  })
  .views((self) => ({}))
  .actions((self) => ({}));

export default Attorney;
