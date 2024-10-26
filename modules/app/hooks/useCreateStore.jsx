import { useRef } from 'react'
import { createStore } from '@/modules/app/stores/AppStore.js'
import { storeDependencies } from '@/modules/app/stores/StoreDependencies.js'

export const useCreateStore = (initialState) => {
  const storeRef = useRef()
  if (!storeRef.current) {
    storeRef.current = createStore({
      initialState: initialState,
      dependencies: storeDependencies,
    })
  }

  return storeRef.current
}
