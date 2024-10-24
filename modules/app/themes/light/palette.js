import { alpha } from '@mui/system/colorManipulator'
import { common } from '@mui/material/colors'
import { neutral } from '@/modules/app/themes/colors'
import basePalette from '@/modules/app/themes/base/palette'

const palette = {
  mode: 'light',

  text: {
    primary: neutral[900],
    secondary: neutral[500],
    disabled: alpha(neutral[900], 0.38),
  },
  background: {
    default: common.white,
    paper: common.white,
  },

  action: {
    active: neutral[500],
    disabled: alpha(neutral[900], 0.38),
    disabledBackground: alpha(neutral[900], 0.12),
    focus: alpha(neutral[900], 0.16),
    hover: alpha(neutral[900], 0.04),
    selected: alpha(neutral[900], 0.12),
  },
  divider: '#F2F4F7',

  ...basePalette,
}

export default palette
