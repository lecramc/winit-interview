import { types } from 'mobx-state-tree'
import ThemeStore from '@/modules/app/stores/ThemeStore'
import AttorneyStore from '@/modules/attorney/core/stores/attorney.store.js'

const AppStore = types
  .model('AppStore', {
    attorney: types.optional(AttorneyStore, { attorneys: [] }),
    theme: types.optional(ThemeStore, {}),
  })
  .actions((self) => ({
    setDependencies(dependencies) {
      self.dependencies = dependencies
    },
  }))

export const createStore = ({ initialState = {}, dependencies = {} }) => {
  console.log(`From createStore: ${JSON.stringify(initialState)}`)
  const store = AppStore.create({ ...initialState })
  store.setDependencies(dependencies)
  return store
}

export default AppStore
