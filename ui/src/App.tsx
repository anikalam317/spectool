import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import SpecTool from './SpecTool';

function App() {
  const theme = createMuiTheme({
    palette: {
      type: "light"
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SpecTool/>
    </ThemeProvider>
  );
}

export default App;
