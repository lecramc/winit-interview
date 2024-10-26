import checkAuth from '@/modules/app/utils/checkAuth.js'
import { storeDependencies } from '@/modules/app/stores/StoreDependencies.js'
import { createStore } from '@/modules/app/stores/AppStore.js'

export const prefetchPage = async (ctx) => {
  const store = createStore({ dependencies: storeDependencies })
  await checkAuth(store, ctx.req.cookies)
  return store
}
