import AppStore from '@/modules/app/stores/AppStore'
import { FakeAttorneyGateway } from '@/modules/attorney/core/gateways-infra/fake-attorney.gateway.js'
import { FakeAttorneyPriceMapGateway } from '@/modules/attorney-price-map/core/gateways-infra/fake-attorney-price-map.gateway.js'
import { FakeViolationGateway } from '@/modules/violation/core/gateways-infra/fake-violation.gateway.js'
import { FakeTrafficCountyGateway } from '@/modules/traffic-county/core/gateways-infra/fake-traffic-county.gateway.js'
import { FakeTrafficCourtGateway } from '@/modules/traffic-court/core/gateways-infra/fake-traffic-court.gateway.js'

export const createTestStore = ({ initialState = {}, dependencies = {} }) => {
  const testDependencies = {
    attorneyGateway: new FakeAttorneyGateway(),
    attorneyPriceMapGateway: new FakeAttorneyPriceMapGateway(),
    violationGateway: new FakeViolationGateway(),
    trafficCountyGateway: new FakeTrafficCountyGateway(),
    trafficCourtGateway: new FakeTrafficCourtGateway(),
    ...dependencies,
  }

  const store = AppStore.create({
    ...initialState,
  })

  store.setDependencies(testDependencies)
  return store
}

export default createTestStore
