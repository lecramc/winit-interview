// MobX state management
import { Provider as MobxProvider } from 'mobx-react'
// Theme
import { useCreateStore } from '@/modules/app/hooks/useCreateStore'
import ThemeProvider from '@/modules/app/stores/providers/ThemeProvider'

// Global Styles

const App = ({ Component, pageProps }) => {
  const store = useCreateStore(pageProps.initialState)

  return (
    <MobxProvider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </MobxProvider>
  )
}

export default App
