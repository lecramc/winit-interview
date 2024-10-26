import { flow, getParent, types } from 'mobx-state-tree'

const TrafficStateModel = types.model('TrafficState', {
  _id: types.identifier,
  longName: types.string,
  shortName: types.string,
})

const TrafficStateStore = types
  .model('TrafficStateStore', {
    trafficStates: types.array(TrafficStateModel),
    selectedTrafficState: types.maybeNull(TrafficStateModel),
    state: types.optional(types.enumeration(['pending', 'fulfilled', 'rejected', 'idle']), 'idle'),
  })
  .actions((self) => ({
    fetchTrafficStates: flow(function* () {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.trafficStateGateway
        self.trafficStates = yield gateway.getTrafficStates()
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    getTrafficStateById: flow(function* (id) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.trafficStateGateway
        self.selectedTrafficState = yield gateway.getTrafficStateById(id)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    createTrafficState: flow(function* (data) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.trafficStateGateway
        const newState = yield gateway.createTrafficState(data)
        self.trafficStates.push(newState)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    updateTrafficState: flow(function* (data) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.trafficStateGateway
        const updatedState = yield gateway.updateTrafficState(data)
        const index = self.trafficStates.findIndex((state) => state._id === data._id)
        if (index !== -1) {
          self.trafficStates[index] = updatedState
        }
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    deleteTrafficState: flow(function* (id) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.trafficStateGateway
        yield gateway.deleteTrafficState(id)
        self.trafficStates = self.trafficStates.filter((state) => state._id !== id)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
  }))

export default TrafficStateStore
