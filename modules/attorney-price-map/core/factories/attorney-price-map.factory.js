import { AttorneyFactory } from '@/modules/attorney/core/factories/attorney.factory.js'
import { TrafficCourtFactory } from '@/modules/traffic-court/core/factories/traffic-court.factory.js'
import { TrafficCountyFactory } from '@/modules/traffic-county/core/factories/traffic-county.factory.js'

export class AttorneyPriceMapFactory {
  static create(data = {}) {
    return {
      _id: data._id || Date.now().toString(),
      attorney: data.attorney || AttorneyFactory.create(),
      court: data.court || TrafficCourtFactory.create(),
      county: data.county || TrafficCountyFactory.create(),
      violation: data.violation || null,
      pointsRange: data.pointsRange || [0, 0],
      price: data.price || 0,
      enable: data.enable || true,
    }
  }
}
