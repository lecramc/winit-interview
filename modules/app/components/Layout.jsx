import { AppProvider } from '@toolpad/core/nextjs'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import SettingsIcon from '@mui/icons-material/Settings'
import Image from 'next/image'
import { DashboardLayout } from '@toolpad/core'
import { useMediaQuery, useTheme } from '@mui/material'
import { Logout } from '@/modules/auth/ui/Logout.jsx'

const navigation = [
  { title: 'Dashboard', icon: <DashboardIcon />, segment: 'dashboard', active: true },
  { title: 'Attorneys', icon: <PeopleIcon />, segment: 'attorneys-panel' },
  { title: 'Price maps', icon: <AttachMoneyIcon />, segment: 'price-maps' },
  { title: 'Settings', icon: <SettingsIcon />, segment: 'settings' },
]

const AppLayout = ({ children }) => {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'))
  const isLg = useMediaQuery(theme.breakpoints.up('lg'))
  const paddingX = isXs ? 2 : isSm ? 4 : isMd ? 8 : isLg ? 12 : 16
  const paddingY = isXs ? 1 : 2
  return (
    <AppProvider
      navigation={navigation}
      branding={{
        logo: <Image src="/logo.png" alt="logo" width={50} height={100} />,
        title: '',
      }}
    >
      <DashboardLayout
        slots={{ toolbarActions: Logout }}
        sx={{ paddingX: paddingX, paddingY: paddingY }}
      >
        {children}
      </DashboardLayout>
    </AppProvider>
  )
}

export default AppLayout
