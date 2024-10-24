import { flow, getParent, types } from 'mobx-state-tree'
import { deleteAttorneyPriceMap } from '@/modules/attorney-price-map/core/usecases/delete-attorney-price-map.usecase.js'
import { getAttorneyPriceMaps } from '@/modules/attorney-price-map/core/usecases/get-attorney-price-maps.usecase.js'
import { getAttorneyPriceMapById } from '@/modules/attorney-price-map/core/usecases/get-attorney-price-map-by-id.usecase.js'
import { updateAttorneyPriceMap } from '@/modules/attorney-price-map/core/usecases/update-attorney-price-map.usecase.js'
import { createAttorneyPriceMap } from '@/modules/attorney-price-map/core/usecases/create-attorney-price-map.usecase.js'

const AttorneyPriceMapModel = types.model('AttorneyPriceMap', {
  _id: types.identifier,
  attorney: types.string,
  court: types.maybeNull(types.string),
  county: types.maybeNull(types.string),
  violation: types.maybeNull(types.string),
  pointsRange: types.array(types.number),
  price: types.number,
})

const AttorneyPriceMapStore = types
  .model('AttorneyPriceMapStore', {
    priceMaps: types.array(AttorneyPriceMapModel),
    selectedPriceMap: types.maybeNull(AttorneyPriceMapModel),
    state: types.optional(types.enumeration(['pending', 'fulfilled', 'rejected', 'idle']), 'idle'),
  })
  .actions((self) => ({
    fetchAttorneyPriceMaps: flow(function* () {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.attorneyPriceMapGateway
        self.priceMaps = yield getAttorneyPriceMaps(gateway)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    getAttorneyPriceMapById: flow(function* (id) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.attorneyPriceMapGateway
        self.selectedPriceMap = yield getAttorneyPriceMapById({
          id,
          attorneyPriceMapGateway: gateway,
        })
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
    createAttorneyPriceMap: flow(function* (data) {
      self.state = 'pending'
      try {
        const gateway = getParent(self).dependencies.attorneyPriceMapGateway
        const newPriceMap = yield createAttorneyPriceMap({
          newAttorneyData: data,
          attorneyPriceMapGateway: gateway,
        })
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
        const updatedPriceMap = yield updateAttorneyPriceMap({
          updatedAttorneyData: dataToUpdate,
          attorneyPriceMapGateway: gateway,
        })
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
        yield deleteAttorneyPriceMap({ id, attorneyPriceMapGateway: gateway })
        self.priceMaps = self.priceMaps.filter((priceMap) => priceMap._id !== id)
        self.state = 'fulfilled'
      } catch (error) {
        self.state = 'rejected'
      }
    }),
  }))

export default AttorneyPriceMapStore
