import { createContext, useState } from 'react';
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
  const [user, setUser] = useState(initialUser);

  const login = (newUser: User) => {
    setUser({ ...newUser, authenticated: true });
  };

  const logout = () => {
    setUser(initialUser);
  };

  return <AuthContext.Provider value={{ ...user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
