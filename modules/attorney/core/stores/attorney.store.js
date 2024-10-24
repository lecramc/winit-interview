import { flow, getParent, types } from 'mobx-state-tree'
import { getAttorneys } from '@/modules/attorney/core/usecases/get-attorneys.usecase.js'
import { getAttorneyById } from '@/modules/attorney/core/usecases/get-attorney-by-id.usecase.js'
import { createAttorney } from '@/modules/attorney/core/usecases/create-attorney.usecase.js'
import { deleteAttorney } from '@/modules/attorney/core/usecases/delete-attorney.usecase.js'
import { updateAttorney } from '@/modules/attorney/core/usecases/update-attorney.usecase.js'

const AttorneyModel = types.model('Attorney', {
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
  .actions((self) => ({
    fetchAttorneys: flow(function* () {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.attorneyGateway
        self.attorneys = yield getAttorneys(gateway)
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
        self.selectedAttorney = yield getAttorneyById({ id, attorneyGateway: gateway })
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),

    createAttorney: flow(function* (newAttorneyData) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.attorneyGateway
        const createdAttorney = yield createAttorney({ newAttorneyData, attorneyGateway: gateway })
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
        const updatedAttorney = yield updateAttorney({
          updatedAttorneyData,
          attorneyGateway: gateway,
        })
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
        yield deleteAttorney({ id, attorneyGateway: gateway })
        self.attorneys = self.attorneys.filter((attorney) => attorney._id !== id)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
  }))

export default AttorneyStore
