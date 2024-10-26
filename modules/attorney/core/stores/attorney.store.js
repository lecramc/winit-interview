import { flow, getParent, types } from 'mobx-state-tree'

export const AttorneyModel = types.model('Attorney', {
  _id: types.identifier,
  name: types.string,
  email: types.string,
  address: types.optional(types.string, ''),
  phone: types.optional(types.string, ''),
  enable: types.optional(types.boolean, true),
})

const AttorneyStore = types
  .model('AttorneyStore', {
    attorneys: types.array(AttorneyModel),
    state: types.optional(types.enumeration(['pending', 'fulfilled', 'rejected', 'idle']), 'idle'),
    selectedAttorney: types.maybeNull(AttorneyModel),
  })
  .views((self) => ({
    getSelectedAttorney() {
      return self.selectedAttorney
    },
  }))
  .actions((self) => ({
    fetchAttorneys: flow(function* () {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.attorneyGateway
        self.attorneys = yield gateway.getAttorneys()
        self.state = 'fulfilled'
      } catch (error) {
        console.log(error)
        self.state = 'rejected'
      }
    }),

    getAttorneyById: flow(function* (id) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.attorneyGateway
        self.selectedAttorney = yield gateway.getAttorneyById(id)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),

    createAttorney: flow(function* (newAttorneyData) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.attorneyGateway
        const createdAttorney = yield gateway.createAttorney(newAttorneyData)
        self.attorneys.push(createdAttorney)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),

    updateAttorney: flow(function* (updatedAttorneyData) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.attorneyGateway
        const updatedAttorney = yield gateway.updateAttorney(updatedAttorneyData)

        const index = self.attorneys.findIndex(
          (attorney) => attorney._id === updatedAttorneyData._id,
        )
        if (index !== -1) {
          self.attorneys[index] = updatedAttorney
        }
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),

    deleteAttorney: flow(function* (id) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.attorneyGateway
        yield gateway.deleteAttorney(id)
        self.attorneys = self.attorneys.filter((attorney) => attorney._id !== id)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    cleanSelectedAttorney() {
      self.selectedAttorney = null
    },
  }))

export default AttorneyStore
