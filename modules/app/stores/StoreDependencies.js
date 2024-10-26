import { HttpAttorneyGateway } from '@/modules/attorney/core/gateways-infra/http-attorney.gateway.js'
import { HttpAttorneyPriceMapGateway } from '@/modules/attorney-price-map/core/gateways-infra/http-attorney-price-map.gateway.js'
import { HttpViolationGateway } from '@/modules/violation/core/gateways-infra/http-violation.gateway.js'
import { HttpTrafficCountyGateway } from '@/modules/traffic-county/core/gateways-infra/http-traffic-county.gateway.js'
import { HttpTrafficCourtGateway } from '@/modules/traffic-court/core/gateways-infra/http-traffic-court.gateway.js'
import { HttpTrafficStateGateway } from '@/modules/traffic-state/core/gateways-infra/http-traffic-state.gateway.js'
import { HttpAuthGateway } from '@/modules/auth/core/gateways-infra/http-auth.gateway.js'

export const storeDependencies = {
  attorneyGateway: new HttpAttorneyGateway(),
  attorneyPriceMapGateway: new HttpAttorneyPriceMapGateway(),
  violationGateway: new HttpViolationGateway(),
  trafficCountyGateway: new HttpTrafficCountyGateway(),
  trafficCourtGateway: new HttpTrafficCourtGateway(),
  trafficStateGateway: new HttpTrafficStateGateway(),
  authGateway: new HttpAuthGateway(),
}
