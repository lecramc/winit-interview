import { TrafficStateFactory } from '@/modules/traffic-state/core/factories/traffic-state.factory.js'

export class TrafficCountyFactory {
  static create(data = {}) {
    return {
      _id: data._id || '',
      name: data.name || '',
      trafficState: TrafficStateFactory.create(),
      enable: true,
      ...data,
    }
  }
}
