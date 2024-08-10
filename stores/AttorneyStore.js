import { types, flow } from 'mobx-state-tree'
import Attorney from '@/stores/models/Attorney'

const AttorneyStore = types
  .model('AttorneyStore', {
    attorneys: types.array(Attorney), // Initialize attorneysPanel as an array of Attorney model
  })
  .views((self) => ({
    // Add views here
  }))
  .actions((self) => ({
    fetchAttorneys: flow(function* fetchAttorneys() {}),
    createAttorney: flow(function* createAttorney(attorney) {}),
    updateAttorney: flow(function* updateAttorney(attorney) {}),
    disableAttorney: flow(function* toggleAttorney(attorney) {}),
    // Add more actions here
  }))

export default AttorneyStore
