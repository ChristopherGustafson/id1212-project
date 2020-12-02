import { CssBaseline } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarContextProvider } from './components/SnackBar';
import { AuthContextProvider } from './context/AuthContext';
import Router from './Router';

const App: React.FC = () => (
  <BrowserRouter>
    <CssBaseline />
    <SnackbarContextProvider>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </SnackbarContextProvider>
  </BrowserRouter>
);

export default App;
