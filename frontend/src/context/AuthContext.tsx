import { createContext, useContext, useEffect, useState } from 'react';
import SnackbarContext from '../components/SnackBar';
import api from '../lib/api';
import { User } from '../types/user';

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
  const openSnackbar = useContext(SnackbarContext);
  const [user, setUser] = useState(initialUser);

  const login = (newUser: User) => {
    setUser({ ...newUser, authenticated: true });
  };

  const logout = () => {
    api
      .logout()
      .then(() => {
        setUser(initialUser);
        openSnackbar({ content: 'Successfully logged out', severity: 'success' });
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
      .catch(() => {});
  }, []);

  return <AuthContext.Provider value={{ ...user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
