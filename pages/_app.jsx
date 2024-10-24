// MobX state management
import { Provider as MobxProvider } from 'mobx-react'
// Theme
import { useCreateStore } from '@/modules/app/hooks/useCreateStore'
import ThemeProvider from '@/modules/app/stores/providers/ThemeProvider'
import { getSnapshot } from 'mobx-state-tree'

// Global Styles

const App = ({ Component, pageProps }) => {
  const store = useCreateStore(pageProps.initialState)
  console.log(pageProps.initialState, getSnapshot(store.attorney))
  return (
    <MobxProvider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </MobxProvider>
  )
}

export default App
