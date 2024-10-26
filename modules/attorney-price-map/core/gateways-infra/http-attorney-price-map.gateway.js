import { z } from 'zod'
import axios from '@/modules/app/axios.js'
import { AttorneyPriceMapGateway } from '@/modules/attorney-price-map/core/gateways/attorney-price-map.gateway.js'
import { violationDto } from '@/modules/violation/core/gateways-infra/http-violation.gateway.js'
import { trafficCourtDto } from '@/modules/traffic-court/core/gateways-infra/http-traffic-court.gateway.js'
import { trafficCountyDto } from '@/modules/traffic-county/core/gateways-infra/http-traffic-county.gateway.js'
import { attorneyDto } from '@/modules/attorney/core/gateways-infra/http-attorney.gateway.js'

const attorneyPriceMapDto = z.object({
  _id: z.string(),
  attorney: attorneyDto,
  court: trafficCourtDto.optional().nullable(),
  county: trafficCountyDto.optional().nullable(),
  violation: violationDto.optional().nullable(),
  pointsRange: z.array(z.number()).optional().nullable(),
  price: z.number(),
})

const getAttorneyPriceMapsDto = z.object({
  success: z.boolean(),
  data: z.array(attorneyPriceMapDto),
})

const singleAttorneyPriceMapDto = z.object({
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

  async getAttorneyPriceMapById(id) {
    const unvalidatedResponse = await axios.get(`/attorney-price-map-data/${id}`)
    const result = singleAttorneyPriceMapDto.safeParse(unvalidatedResponse.data)
    if (!result.success) {
      throw new Error('Failed to fetch attorney price map by ID')
    }
    return result.data.data
  }

  async createAttorneyPriceMap(newPriceMap) {
    const unvalidatedResponse = await axios.post('/attorney-price-map-data', newPriceMap)
    const result = singleAttorneyPriceMapDto.safeParse(unvalidatedResponse.data)
    if (!result.success) {
      throw new Error('Failed to create attorney price map')
    }
    return result.data.data
  }

  async updateAttorneyPriceMap(updatedData) {
    const unvalidatedResponse = await axios.put(
      `/attorney-price-map-data/${updatedData._id}`,
      updatedData,
    )
    const result = singleAttorneyPriceMapDto.safeParse(unvalidatedResponse.data)
    if (!result.success) {
      throw new Error('Failed to update attorney price map')
    }
    return result.data.data
  }

  async deleteAttorneyPriceMap(id) {
    const unvalidatedResponse = await axios.delete(`/attorney-price-map-data/${id}`)
    const result = singleAttorneyPriceMapDto.safeParse(unvalidatedResponse.data)
    if (!result.success) {
      throw new Error('Failed to delete attorney price map')
    }
    return result.data.data
  }
}
