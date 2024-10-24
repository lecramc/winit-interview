import { flow, getParent, types } from 'mobx-state-tree'
import { deleteViolation } from '@/modules/violation/core/usecases/delete-violation.usecase.js'
import { updateViolation } from '@/modules/violation/core/usecases/update-violation.usecase.js'
import { createViolation } from '@/modules/violation/core/usecases/create-violation.usecase.js'
import { getViolationById } from '@/modules/violation/core/usecases/get-violation-by-id.usecase.js'
import { getViolations } from '@/modules/violation/core/usecases/get-violations.usecase.js'

const ViolationModel = types.model('Violation', {
  _id: types.identifier,
  name: types.string,
  points: types.number,
})

const ViolationStore = types
  .model('ViolationStore', {
    violations: types.array(ViolationModel),
    selectedViolation: types.maybeNull(ViolationModel),
    state: types.optional(types.enumeration(['pending', 'fulfilled', 'rejected', 'idle']), 'idle'),
  })
  .actions((self) => ({
    fetchViolations: flow(function* () {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.violationGateway
        self.violations = yield getViolations(gateway)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    fetchViolationById: flow(function* (id) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.violationGateway
        self.selectedViolation = yield getViolationById(id, gateway)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    createViolation: flow(function* (data) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.violationGateway
        const newViolation = yield createViolation(data, gateway)
        self.violations.push(newViolation)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    updateViolation: flow(function* (data) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.violationGateway
        const updatedViolation = yield updateViolation(data, gateway)
        const index = self.violations.findIndex((violation) => violation._id === data._id)
        if (index !== -1) {
          self.violations[index] = updatedViolation
        }
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    deleteViolation: flow(function* (id) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.violationGateway
        yield deleteViolation(id, gateway)
        self.violations = self.violations.filter((violation) => violation._id !== id)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
  }))

export default ViolationStore
