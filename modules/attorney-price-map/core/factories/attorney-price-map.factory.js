import { AttorneyFactory } from '@/modules/attorney/core/factories/attorney.factory.js'

export class AttorneyPriceMapFactory {
  static create(data = {}) {
    return {
      _id: data._id || Date.now().toString(),
      attorney: data.attorney || AttorneyFactory.create({ _id: 'attorney-id' }),
      court: data.court || null,
      county: data.county || null,
      violation: data.violation || null,
      pointsRange: data.pointsRange || [0, 0],
      price: data.price || 0,
      enable: data.enable || true,
    }
  }
}
