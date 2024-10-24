import { flow, getParent, types } from 'mobx-state-tree'
import { getTrafficCountyById } from '@/modules/traffic-county/core/usecases/get-traffic-county-by-id.usecase.js'
import { getTrafficCounties } from '@/modules/traffic-county/core/usecases/get-traffic-counties.usecase.js'
import { updateTrafficCounty } from '@/modules/traffic-county/core/usecases/update-traffic-county.usecase.js'
import { deleteTrafficCounty } from '@/modules/traffic-county/core/usecases/delete-traffic-county.usecase.js'
import { createTrafficCounty } from '@/modules/traffic-county/core/usecases/create-traffic-county.usecase.js'

const TrafficCountyModel = types.model('TrafficCounty', {
  _id: types.identifier,
  name: types.string,
  trafficState: types.string,
  stateShortName: types.string,
})

const TrafficCountyStore = types
  .model('TrafficCountyStore', {
    trafficCounties: types.array(TrafficCountyModel),
    selectedTrafficCounty: types.maybeNull(TrafficCountyModel),
    state: types.optional(types.enumeration(['pending', 'fulfilled', 'rejected', 'idle']), 'idle'),
  })
  .actions((self) => ({
    fetchTrafficCounties: flow(function* () {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.trafficCountyGateway
        self.trafficCounties = yield getTrafficCounties(gateway)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    getTrafficCountyById: flow(function* (id) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.trafficCountyGateway
        const county = yield getTrafficCountyById(gateway, id)
        self.selectedTrafficCounty = county
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    createTrafficCounty: flow(function* (data) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.trafficCountyGateway
        const newCounty = yield createTrafficCounty(gateway, data)
        self.trafficCounties.push(newCounty)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    updateTrafficCounty: flow(function* (data) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.trafficCountyGateway
        const updatedCounty = yield updateTrafficCounty(gateway, data)
        const index = self.trafficCounties.findIndex((county) => county._id === updatedCounty._id)
        if (index !== -1) {
          self.trafficCounties[index] = updatedCounty
        }
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    deleteTrafficCounty: flow(function* (id) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.trafficCountyGateway
        yield deleteTrafficCounty(gateway, id)
        self.trafficCounties = self.trafficCounties.filter((county) => county._id !== id)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
  }))

export default TrafficCountyStore
