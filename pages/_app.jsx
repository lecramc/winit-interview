// MobX state management
import { Provider as MobxProvider } from 'mobx-react'
// Theme
import { useCreateStore } from '@/modules/app/hooks/useCreateStore'
import ThemeProvider from '@/modules/app/stores/providers/ThemeProvider'
import Layout from '@/modules/app/components/Layout.jsx'
import { useRouter } from 'next/router'
// Global Styles

const App = ({ Component, pageProps }) => {
  const { initialState } = pageProps
  const store = useCreateStore(initialState)

  const router = useRouter()
  return (
    <MobxProvider store={store}>
      <ThemeProvider>
        {store.auth.isAuthenticated ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <>
            {(router.pathname === '/login' || router.pathname === '/register') && (
              <Component {...pageProps} />
            )}
          </>
        )}
      </ThemeProvider>
    </MobxProvider>
  )
}

export default App
