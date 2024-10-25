import { flow, getParent, types } from 'mobx-state-tree'
import { getTrafficCourts } from '@/modules/traffic-court/core/usecases/get-traffic-courts.usecase.js'
import { getTrafficCourtById } from '@/modules/traffic-court/core/usecases/get-traffic-court-by-id.usecase.js'
import { createTrafficCourt } from '@/modules/traffic-court/core/usecases/create-traffic-court.usecase.js'
import { updateTrafficCourt } from '@/modules/traffic-court/core/usecases/update-traffic-court.usecase.js'
import { deleteTrafficCourt } from '@/modules/traffic-court/core/usecases/delete-traffic-court.usecase.js'

const TrafficCourtModel = types.model('TrafficCourt', {
  _id: types.identifier,
  name: types.string,
  address: types.string,
  trafficCounty: types.string,
  trafficState: types.string,
})

const TrafficCourtStore = types
  .model('TrafficCourtStore', {
    trafficCourts: types.array(TrafficCourtModel),
    selectedTrafficCourt: types.maybeNull(TrafficCourtModel),
    state: types.optional(types.enumeration(['pending', 'fulfilled', 'rejected', 'idle']), 'idle'),
  })
  .actions((self) => ({
    fetchTrafficCourts: flow(function* () {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.trafficCourtGateway
        self.trafficCourts = yield getTrafficCourts(gateway)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    getTrafficCourtById: flow(function* (id) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.trafficCourtGateway
        self.selectedTrafficCourt = yield getTrafficCourtById(gateway, id)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    createTrafficCourt: flow(function* (data) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.trafficCourtGateway
        const newCourt = yield createTrafficCourt(gateway, data)
        self.trafficCourts.push(newCourt)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    updateTrafficCourt: flow(function* (data) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.trafficCourtGateway
        const updatedCourt = yield updateTrafficCourt(gateway, data)
        const index = self.trafficCourts.findIndex((court) => court._id === data._id)
        if (index !== -1) {
          self.trafficCourts[index] = updatedCourt
        }
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    deleteTrafficCourt: flow(function* (id) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.trafficCourtGateway
        yield deleteTrafficCourt(gateway, id)
        self.trafficCourts = self.trafficCourts.filter((court) => court._id !== id)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
  }))

export default TrafficCourtStore
