import { AttorneyPriceMapGateway } from '@/modules/attorney-price-map/core/gateways/attorney-price-map.gateway.js'

export class FakeAttorneyPriceMapGateway extends AttorneyPriceMapGateway {
  attorneyPriceMaps = []

  async getAttorneyPriceMaps() {
    if (this.attorneyPriceMaps.length > 0) {
      return this.attorneyPriceMaps
    }
    return new Error('No attorneys found')
  }
  async getAttorneyPriceMapById(id) {
    const priceMap = this.attorneyPriceMaps.find((priceMap) => priceMap._id === id)
    if (priceMap) {
      return priceMap
    }
    throw new Error(`Attorney with id ${id} not found`)
  }

  async createAttorneyPriceMap(newAttorneyPriceMapData) {
    this.attorneyPriceMaps.push(newAttorneyPriceMapData)
    return newAttorneyPriceMapData
  }

  async updateAttorneyPriceMap(updatedAttorneyPriceMapData) {
    const index = this.attorneyPriceMaps.findIndex(
      (priceMap) => priceMap._id === updatedAttorneyPriceMapData._id,
    )
    if (index !== -1) {
      this.attorneyPriceMaps[index] = {
        ...this.attorneyPriceMaps[index],
        ...updatedAttorneyPriceMapData,
      }
      return this.attorneyPriceMaps[index]
    }
    throw new Error(`Attorney with id ${updatedAttorneyPriceMapData._id} not found`)
  }

  async deleteAttorneyPriceMap(id) {
    const index = this.attorneyPriceMaps.findIndex((priceMap) => priceMap._id === id)
    if (index !== -1) {
      this.attorneyPriceMaps.splice(index, 1)
      return true
    }
    throw new Error(`Attorney with id ${id} not found`)
  }
}
