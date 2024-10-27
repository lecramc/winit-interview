import { flow, getParent, types } from 'mobx-state-tree'
import { TrafficStateModel } from '@/modules/traffic-state/core/stores/traffic-state.store.js'

export const TrafficCountyModel = types.model('TrafficCounty', {
  _id: types.identifier,
  name: types.string,
  trafficState: types.maybeNull(types.union(TrafficStateModel, types.string)),
  enable: types.optional(types.boolean, true),
})

const TrafficCountyStore = types
  .model('TrafficCountyStore', {
    trafficCounties: types.array(TrafficCountyModel),
    selectedTrafficCounty: types.maybeNull(TrafficCountyModel),
    state: types.optional(types.enumeration(['pending', 'fulfilled', 'rejected', 'idle']), 'idle'),
  })
  .views((self) => ({
    getTrafficCounties() {
      return self.trafficCounties
    },
    getSelectedTrafficCounty() {
      return self.selectedTrafficCounty
    },
  }))
  .actions((self) => ({
    fetchTrafficCounties: flow(function* () {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.trafficCountyGateway
        self.trafficCounties = yield gateway.getTrafficCounties()
        self.state = 'fulfilled'
      } catch (error) {
        console.log(error)
        self.state = 'rejected'
      }
    }),
    getTrafficCountyById: flow(function* (id) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.trafficCountyGateway
        self.selectedTrafficCounty = yield gateway.getTrafficCountyById(id)
        self.state = 'fulfilled'
      } catch (error) {
        console.log(error)
        self.state = 'rejected'
      }
    }),
    createTrafficCounty: flow(function* (data) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.trafficCountyGateway
        const newCounty = yield gateway.createTrafficCounty(data)
        self.trafficCounties.push(newCounty)
        self.state = 'fulfilled'
      } catch (error) {
        console.log(error)
        self.state = 'rejected'
      }
    }),
    updateTrafficCounty: flow(function* (data) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.trafficCountyGateway
        const updatedCounty = yield gateway.updateTrafficCounty(data)
        const index = self.trafficCounties.findIndex((county) => county._id === updatedCounty._id)
        if (index !== -1) {
          self.trafficCounties[index] = updatedCounty
        }
        self.state = 'fulfilled'
      } catch (error) {
        console.log(error)
        self.state = 'rejected'
      }
    }),
    deleteTrafficCounty: flow(function* (id) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.trafficCountyGateway
        yield gateway.deleteTrafficCounty(id)
        self.trafficCounties = self.trafficCounties.filter((county) => county._id !== id)
        self.state = 'fulfilled'
      } catch (error) {
        console.log(error)
        self.state = 'rejected'
      }
    }),
    clearSelectedTrafficCounty() {
      self.selectedTrafficCounty = null
    },
  }))

export default TrafficCountyStore
