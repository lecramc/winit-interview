import { Provider as MobxProvider } from 'mobx-react'
import mobxStore from '@/stores/AppStore'
import ThemeProvider from '@/stores/providers/ThemeProvider'
import DashboardLayout from '@/components/DashboardLayout'

import './globals.css'
import SessionProvider from './provider' // Assurez-vous que le chemin est correct
import Footer from '@/components/footer'

const App = ({ Component, pageProps }) => {
  return (
    <MobxProvider value={mobxStore}>
      <ThemeProvider>
        <SessionProvider>
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
          <Footer />
        </SessionProvider>
      </ThemeProvider>
    </MobxProvider>
  )
}

export default App
