import { flow, getParent, types } from 'mobx-state-tree'

export const TrafficCourtModel = types.model('TrafficCourt', {
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
        self.trafficCourts = yield gateway.getTrafficCourts()
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    getTrafficCourtById: flow(function* (id) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.trafficCourtGateway
        self.selectedTrafficCourt = yield gateway.getTrafficCourtById(id)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    createTrafficCourt: flow(function* (data) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.trafficCourtGateway
        const newCourt = yield gateway.createTrafficCourt(data)
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
        const updatedCourt = yield gateway.updateTrafficCourt(data)
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
        yield gateway.deleteTrafficCourt(id)
        self.trafficCourts = self.trafficCourts.filter((court) => court._id !== id)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
  }))

export default TrafficCourtStore
