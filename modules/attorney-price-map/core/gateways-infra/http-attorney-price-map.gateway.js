import { z } from 'zod'
import axios from '@/modules/app/axios.js'
import { AttorneyPriceMapGateway } from '@/modules/attorney-price-map/core/gateways/attorney-price-map.gateway.js'
import { attorneyDto } from '@/modules/attorney/core/gateways-infra/http-attorney.gateway.js'

const trafficCourtDto = z.object({
  _id: z.string(),
  name: z.string(),
  address: z.string().optional(),
  trafficCounty: z.string(),
  trafficState: z.string(),
  enable: z.boolean(),
})

const trafficCountyDto = z.object({
  _id: z.string(),
  name: z.string(),
  trafficState: z.string(),
  enable: z.boolean(),
})

const violationDto = z.object({
  _id: z.string(),
  name: z.string(),
  points: z.number(),
})
const attorneyPriceMapDto = z.object({
  _id: z.string(),
  attorney: attorneyDto,
  court: trafficCourtDto.optional().nullable(),
  county: trafficCountyDto.optional().nullable(),
  violation: violationDto.optional().nullable(),
  pointsRange: z.array(z.number()).optional().nullable(),
  price: z.number(),
  enable: z.boolean(),
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
      console.error('Validation error:', result.error)
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
    const unvalidatedResponse = await axios.post('/attorney-price-map-data', {
      court: newPriceMap.court?._id || null,
      county: newPriceMap.county?._id || null,
      attorney: newPriceMap.attorney?._id,
      pointsRange: newPriceMap.pointsRange,
      price: newPriceMap.price,
      enable: newPriceMap.enable ?? true,
    })
    const result = singleAttorneyPriceMapDto.safeParse(unvalidatedResponse.data)
    if (!result.success) {
      throw new Error('Failed to create attorney price map')
    }
    return result.data.data
  }

  async updateAttorneyPriceMap(updatedData) {
    const unvalidatedResponse = await axios.put(`/attorney-price-map-data/${updatedData._id}`, {
      _id: updatedData._id,
      violation: updatedData.violation._id || null,
      court: updatedData.court._id || null,
      county: updatedData.county._id || null,
      attorney: updatedData.attorney._id,
      pointsRange: updatedData.pointsRange,
      price: updatedData.price,
      enable: updatedData.enable,
    })
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
