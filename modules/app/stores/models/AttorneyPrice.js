import { types } from 'mobx-state-tree'

const AttorneyPrice = types
  .model('AttorneyPrice', {
    objectId: types.identifier,
    enabled: types.optional(types.boolean, false),
    attorney: types.string,
    court: types.optional(types.string, ''),
    county: types.optional(types.string, ''),
    violation: types.optional(types.string, ''),
    points: types.number,
    price: types.number,
  })
  .views((self) => ({}))
  .actions((self) => ({}))

export default AttorneyPrice
