import { z } from 'zod'
import axios from '@/modules/app/axios.js'
import { AttorneyPriceMapGateway } from '@/modules/attorney-price-map/core/gateways/attorney-price-map.gateway.js'

const attorneyPriceMapDto = z.object({
  _id: z.string(),
  attorney: z.string(),
  court: z.optional(z.string()),
  county: z.optional(z.string()),
  violation: z.optional(z.string()),
  pointsRange: z.optional(z.array(z.number())),
  price: z.number(),
})

const getAttorneyPriceMapsDto = z.object({
  success: z.boolean(),
  data: z.array(attorneyPriceMapDto),
})

const deleteAttorneyPriceMapDto = z.object({
  success: z.boolean(),
  data: attorneyPriceMapDto,
})

export class HttpAttorneyPriceMapGateway extends AttorneyPriceMapGateway {
  async getAttorneyPriceMaps() {
    const unvalidatedResponse = await axios.get('/attorney-price-map-data')
    const result = getAttorneyPriceMapsDto.safeParse(unvalidatedResponse.data)
    if (!result.success) {
      throw new Error('Failed to fetch attorney price maps')
    }
    return result.data.data
  }

  async deleteAttorneyPriceMap(id) {
    const unvalidatedResponse = await axios.delete(`/attorney-price-map-data/${id}`)
    const result = deleteAttorneyPriceMapDto.safeParse(unvalidatedResponse.data)
    if (!result.success) {
      throw new Error('Failed to delete attorney price map')
    }
    return result.data.data
  }
}
