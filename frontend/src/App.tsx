import { CssBaseline } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarContextProvider } from './components/SnackBar';
import { DialogContextProvider } from './components/Dialog';
import { AuthContextProvider } from './context/AuthContext';
import Router from './Router';

const App: React.FC = () => (
  <BrowserRouter>
    <CssBaseline />
    <SnackbarContextProvider>
      <DialogContextProvider>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </DialogContextProvider>
    </SnackbarContextProvider>
  </BrowserRouter>
);

export default App;
