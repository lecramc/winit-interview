import { createTheme as muiCreateTheme, responsiveFontSizes } from '@mui/material/styles'
import baseOptions from '@/modules/app/themes/base/options'
import lightThemeOptions from '@/modules/app/themes/light/options'
import darkThemeOptions from '@/modules/app/themes/dark/options'
import { THEME_TYPES } from '@/constants'

export const createTheme = (palette) => {
  const baseTheme = muiCreateTheme(
    {
      ...baseOptions,
      palette: {
        primary: {
          main: '#3f51b5',
        },
      },
    },
    palette === THEME_TYPES.light ? lightThemeOptions : darkThemeOptions,
  )

  return responsiveFontSizes(baseTheme)
}
