import { useRef } from 'react'
import { createStore } from '@/modules/app/stores/AppStore.js'
import { storeDependencies } from '@/modules/app/stores/StoreDependencies.js'
import { applySnapshot } from 'mobx-state-tree'

export const useCreateStore = (initialState) => {
  const storeRef = useRef(createStore({ initialState, dependencies: storeDependencies }))

  if (initialState) {
    applySnapshot(storeRef.current, initialState)
  }

  return storeRef.current
}
