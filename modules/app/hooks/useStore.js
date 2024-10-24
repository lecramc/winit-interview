import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

const useStore = () => {
  const context = useContext(MobXProviderContext)

  if (!context) {
    throw Error('useStore must be used within a MobX Provider')
  }
  return context.store
}

export default useStore
