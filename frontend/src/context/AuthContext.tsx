import { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Loading from '../components/Loading';
import SnackbarContext from '../components/SnackBar';
import api from '../lib/api';
import { User } from '../types/user';
import * as ROUTES from '../lib/routes';

const initialUser = {
  email: '',
  password: '',
  games: {},
  authenticated: false,
};

const initialValue = {
  ...initialUser,
  login: (_user: User) => {},
  logout: () => {},
};

const AuthContext = createContext(initialValue);

export const AuthContextProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const openSnackbar = useContext(SnackbarContext);
  const [user, setUser] = useState(initialUser);
  const [isLoading, setIsLoading] = useState(true);

  const login = (newUser: User) => {
    setUser({ ...newUser, authenticated: true });
    openSnackbar({ content: 'Successfully logged in', severity: 'success' });
    history.push(ROUTES.JOIN_GAME);
  };

  const logout = () => {
    api
      .logout()
      .then(() => {
        setUser(initialUser);
        openSnackbar({ content: 'Successfully logged out', severity: 'success' });
        history.push(ROUTES.LOGIN);
      })
      .catch(() => {
        openSnackbar({ content: "Couldn't log out", severity: 'error' });
      });
  };

  useEffect(() => {
    api
      .getMe()
      .then((u) => {
        setUser({ ...u, authenticated: true });
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ ...user, login, logout }}>
      {!isLoading ? children : <Loading />}
    </AuthContext.Provider>
  );
};

export default AuthContext;
