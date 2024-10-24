import { alpha } from '@mui/system/colorManipulator'
import { neutral } from '@/modules/app/themes/colors'
import basePalette from '@/modules/app/themes/base/palette'

const palette = {
  mode: 'dark',

  text: {
    primary: '#EDF2F7',
    secondary: '#A0AEC0',
    disabled: '#FFFFFF7A',
  },
  background: {
    default: '#0E1320',
    paper: neutral[900],
  },

  action: {
    active: neutral[500],
    disabled: alpha(neutral[100], 0.38),
    disabledBackground: alpha(neutral[100], 0.12),
    focus: alpha(neutral[100], 0.16),
    hover: alpha(neutral[100], 0.04),
    selected: alpha(neutral[100], 0.12),
  },
  divider: '#2D3748',

  ...basePalette,
}

export default palette
