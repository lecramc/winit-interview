import { flow, getParent, types } from 'mobx-state-tree'

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
  }))

export default AttorneyPriceMapStore
