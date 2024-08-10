import { observer } from 'mobx-react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import useStore from '@/hooks/useStore'
import { createTheme } from '@/themes'

const ThemeProvider = ({ children }) => {
  const { theme } = useStore()

  return (
    <MuiThemeProvider theme={createTheme(theme.themeType)}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

export default observer(ThemeProvider)
