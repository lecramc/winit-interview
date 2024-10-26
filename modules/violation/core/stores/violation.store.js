import { flow, getParent, types } from 'mobx-state-tree'

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
        self.violations = yield gateway.getViolations()
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    getViolationById: flow(function* (id) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.violationGateway
        self.selectedViolation = yield gateway.getViolationById(id)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    createViolation: flow(function* (data) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.violationGateway
        const newViolation = yield gateway.createViolation(data)
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
        const updatedViolation = yield gateway.updateViolation(data)
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
        yield gateway.deleteViolation(id)
        self.violations = self.violations.filter((violation) => violation._id !== id)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
  }))

export default ViolationStore
