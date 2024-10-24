import { useRef } from 'react'
import { createStore } from '@/modules/app/stores/AppStore.js'
import { HttpAttorneyGateway } from '@/modules/attorney/core/gateways-infra/http-attorney.gateway.js'

export const useCreateStore = (initialState) => {
  const storeRef = useRef()
  if (!storeRef.current) {
    storeRef.current = createStore({
      initialState: initialState,
      dependencies: { attorneyGateway: new HttpAttorneyGateway() },
    })
  }

  return storeRef.current
}
