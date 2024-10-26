// MobX state management
import { Provider as MobxProvider } from 'mobx-react'
// Theme
import { useCreateStore } from '@/modules/app/hooks/useCreateStore'
import ThemeProvider from '@/modules/app/stores/providers/ThemeProvider'
import { AppProvider } from '@toolpad/core/nextjs'
import { DashboardLayout } from '@toolpad/core'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import { useRouter } from 'next/router.js'
import { useMediaQuery, useTheme } from '@mui/material'
import Image from 'next/image.js'
// Global Styles

const navigation = [
  { title: 'Dashboard', icon: <DashboardIcon />, segment: 'dashboard' },
  {
    title: 'Attorneys',
    icon: <PeopleIcon />,
    segment: 'attorneys-panel',
  },
]

const App = ({ Component, pageProps }) => {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'))
  const isLg = useMediaQuery(theme.breakpoints.up('lg'))
  const paddingX = isXs ? 2 : isSm ? 4 : isMd ? 8 : isLg ? 12 : 16
  const paddingY = isXs ? 1 : 2

  const store = useCreateStore(pageProps.initialState)
  const router = useRouter()
  return (
    <MobxProvider store={store}>
      <ThemeProvider>
        {store.auth.isAuthenticated ? (
          <AppProvider
            navigation={navigation}
            branding={{
              logo: <Image src="/logo.png" alt="logo" width={50} height={100} />,
              title: '',
            }}
          >
            <DashboardLayout sx={{ paddingX: paddingX, paddingY: paddingY }}>
              <Component {...pageProps} />
            </DashboardLayout>
          </AppProvider>
        ) : (
          <>
            {router.pathname === '/login' ||
              (router.pathname === '/register' && <Component {...pageProps} />)}
          </>
        )}
      </ThemeProvider>
    </MobxProvider>
  )
}

export default App
