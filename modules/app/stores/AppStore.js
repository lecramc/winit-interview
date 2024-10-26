import { types } from 'mobx-state-tree'
import ThemeStore from '@/modules/app/stores/ThemeStore'
import AttorneyStore from '@/modules/attorney/core/stores/attorney.store.js'
import AttorneyPriceMapStore from '@/modules/attorney-price-map/core/stores/attorney-price-map.store.js'
import ViolationStore from '@/modules/violation/core/stores/violation.store.js'
import TrafficCountyStore from '@/modules/traffic-county/core/stores/traffic-county.store.js'
import TrafficCourtStore from '@/modules/traffic-court/core/stores/traffic-court.store.js'
import TrafficStateStore from '@/modules/traffic-state/core/stores/traffic-state.store.js'
import { AuthStore } from '@/modules/auth/core/stores/auth.store.js'

const AppStore = types
  .model('AppStore', {
    attorney: types.optional(AttorneyStore, { attorneys: [] }),
    attorneyPriceMap: types.optional(AttorneyPriceMapStore, { priceMaps: [] }),
    violation: types.optional(ViolationStore, { violations: [] }),
    trafficCounty: types.optional(TrafficCountyStore, { trafficCounties: [] }),
    trafficCourt: types.optional(TrafficCourtStore, { trafficCourts: [] }),
    trafficState: types.optional(TrafficStateStore, { trafficStates: [] }),
    auth: types.optional(AuthStore, { user: {} }),
    theme: types.optional(ThemeStore, {}),
  })
  .actions((self) => ({
    setDependencies(dependencies) {
      self.dependencies = dependencies
    },
  }))

export const createStore = ({ initialState = {}, dependencies = {} }) => {
  const store = AppStore.create({ ...initialState })
  store.setDependencies(dependencies)
  return store
}

export default AppStore
