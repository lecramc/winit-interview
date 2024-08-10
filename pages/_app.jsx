// MobX state management
import { Provider as MobxProvider } from 'mobx-react'
import mobxStore from '@/stores/AppStore'
// Theme
import ThemeProvider from '@/stores/providers/ThemeProvider'

// Global Styles

const App = ({ Component, pageProps }) => {
  return (
    <MobxProvider store={mobxStore}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </MobxProvider>
  )
}

export default App
