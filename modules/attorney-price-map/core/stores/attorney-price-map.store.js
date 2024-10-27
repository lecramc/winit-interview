import { flow, getParent, types } from 'mobx-state-tree'
import { TrafficCourtModel } from '@/modules/traffic-court/core/stores/traffic-court.store.js'
import { TrafficCountyModel } from '@/modules/traffic-county/core/stores/traffic-county.store.js'
import { ViolationModel } from '@/modules/violation/core/stores/violation.store.js'
import { AttorneyModel } from '@/modules/attorney/core/stores/attorney.store.js'

const AttorneyPriceMapModel = types.model('AttorneyPriceMap', {
  _id: types.identifier,
  attorney: AttorneyModel,
  court: types.maybeNull(TrafficCourtModel),
  county: types.maybeNull(TrafficCountyModel),
  violation: types.maybeNull(ViolationModel),
  pointsRange: types.array(types.number),
  price: types.number,
  enable: types.optional(types.boolean, true),
})

const AttorneyPriceMapStore = types
  .model('AttorneyPriceMapStore', {
    priceMaps: types.array(AttorneyPriceMapModel),
    selectedPriceMap: types.maybeNull(AttorneyPriceMapModel),
    state: types.optional(types.enumeration(['pending', 'fulfilled', 'rejected', 'idle']), 'idle'),
  })
  .views((self) => ({
    getSelectedPriceMap() {
      return self.selectedPriceMap
    },
  }))
  .actions((self) => ({
    fetchAttorneyPriceMaps: flow(function* () {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.attorneyPriceMapGateway
        self.priceMaps = yield gateway.getAttorneyPriceMaps()
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    getAttorneyPriceMapById: flow(function* (id) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.attorneyPriceMapGateway
        self.selectedPriceMap = yield gateway.getAttorneyPriceMapById(id)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    createAttorneyPriceMap: flow(function* (data) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.attorneyPriceMapGateway
        const newPriceMap = yield gateway.createAttorneyPriceMap(data)
        self.priceMaps.push(newPriceMap)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    updateAttorneyPriceMap: flow(function* (dataToUpdate) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.attorneyPriceMapGateway
        const updatedPriceMap = yield gateway.updateAttorneyPriceMap(dataToUpdate)
        const index = self.priceMaps.findIndex((priceMap) => priceMap._id === dataToUpdate._id)
        if (index !== -1) {
          self.priceMaps[index] = updatedPriceMap
        }
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    deleteAttorneyPriceMap: flow(function* (id) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.attorneyPriceMapGateway
        yield gateway.deleteAttorneyPriceMap(id)
        self.priceMaps = self.priceMaps.filter((priceMap) => priceMap._id !== id)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    getPriceMapByAttorneyId(id) {
      return self.priceMaps.filter((priceMap) => priceMap.attorney._id === id)
    },
    cleanSelectedPriceMap() {
      self.selectedPriceMap = null
    },
  }))

export default AttorneyPriceMapStore
