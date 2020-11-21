import { AuthContextProvider } from './context/AuthContext';
import Router from './Router';

const App: React.FC = () => (
  <AuthContextProvider>
    <Router />
  </AuthContextProvider>
);

export default App;
