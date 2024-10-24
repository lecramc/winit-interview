import { types } from 'mobx-state-tree'
import { THEME_TYPES } from '@/constants'

const ThemeStore = types
  .model('ThemeStore', {
    themeType: types.optional(types.string, THEME_TYPES.light),
  })
  .actions((self) => ({
    toggleTheme() {
      self.themeType = self.themeType === THEME_TYPES.light ? THEME_TYPES.dark : THEME_TYPES.light
    },
  }))

export default ThemeStore
