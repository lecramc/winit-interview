import { flow, getParent, types } from 'mobx-state-tree'
import { updateTrafficState } from '@/modules/traffic-state/core/usecases/update-traffic-state.usecase.js'
import { deleteTrafficState } from '@/modules/traffic-state/core/usecases/delete-traffic-state.usecase.js'
import { createTrafficState } from '@/modules/traffic-state/core/usecases/create-traffic-state.usecase.js'
import { getTrafficStateById } from '@/modules/traffic-state/core/usecases/get-traffic-state-by-id.usecase.js'
import { getTrafficStates } from '@/modules/traffic-state/core/usecases/get-traffic-states.usecase.js'

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
        self.trafficStates = yield getTrafficStates(gateway)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    getTrafficStateById: flow(function* (id) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.trafficStateGateway
        self.selectedTrafficState = yield getTrafficStateById(gateway, id)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    createTrafficState: flow(function* (data) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.trafficStateGateway
        const newState = yield createTrafficState(gateway, data)
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
        const updatedState = yield updateTrafficState(gateway, data)
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
        yield deleteTrafficState(gateway, id)
        self.trafficStates = self.trafficStates.filter((state) => state._id !== id)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
  }))

export default TrafficStateStore
