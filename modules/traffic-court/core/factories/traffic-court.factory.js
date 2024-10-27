import { TrafficStateFactory } from '@/modules/traffic-state/core/factories/traffic-state.factory.js'
import { TrafficCountyFactory } from '@/modules/traffic-county/core/factories/traffic-county.factory.js'

export class TrafficCourtFactory {
  static create(data = {}) {
    return {
      _id: '',
      name: '',
      address: '',
      trafficState: TrafficStateFactory.create(),
      trafficCounty: TrafficCountyFactory.create(),
      enable: true,
      ...data,
    }
  }
}
