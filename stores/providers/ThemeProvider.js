// stores/providers/ThemeProvider.js
import { observer } from 'mobx-react-lite';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { useStore } from '@/stores/StoreContext';
import { createTheme } from '@/themes';

const ThemeProvider = ({ children }) => {
  const { theme } = useStore();

  return (
    <MuiThemeProvider theme={createTheme(theme.themeType)}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default observer(ThemeProvider);
