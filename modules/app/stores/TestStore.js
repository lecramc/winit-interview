import AppStore from '@/modules/app/stores/AppStore'
import { FakeAttorneyGateway } from '@/modules/attorney/core/gateways-infra/fake-attorney.gateway.js'

export const createTestStore = ({ initialState = {}, dependencies = {} }) => {
  const testDependencies = {
    attorneyGateway: new FakeAttorneyGateway(),
    ...dependencies,
  }

  const store = AppStore.create({
    ...initialState,
  })

  store.setDependencies(testDependencies)
  return store
}

export default createTestStore
