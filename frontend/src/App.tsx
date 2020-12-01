import { SnackbarContextProvider } from './components/SnackBar';
import { AuthContextProvider } from './context/AuthContext';
import Router from './Router';

const App: React.FC = () => (
  <SnackbarContextProvider>
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  </SnackbarContextProvider>
);

export default App;
