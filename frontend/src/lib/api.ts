import { loginParams, chessMoveParams } from '../types/api';
import { User } from '../types/user';
import { ChessGame } from '../types/chessGame';

const baseApiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';

function makeRequest<T>(endpoint: string, init?: RequestInit): Promise<T> {
  return fetch(`${baseApiUrl}${endpoint}`, {
    ...init,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  }).then(async (res) => {
    let data = null;
    try {
      data = await res.json();
    } catch {}

    if (res.ok) {
      return data;
    } else {
      throw data;
    }
  });
}

const api = {
  login: (values: loginParams): Promise<User> => {
    return makeRequest('/user/login', { method: 'POST', body: JSON.stringify(values) });
  },

  register: (values: loginParams): Promise<User> => {
    return makeRequest('/user/register', { method: 'POST', body: JSON.stringify(values) });
  },

  getMe: (): Promise<User> => {
    return makeRequest('/user/me');
  },

  logout: (): Promise<unknown> => {
    return makeRequest('/user/logout');
  },

  createGame: (code: string): Promise<ChessGame> => {
    return makeRequest('/chess/createGame', { method: 'POST', body: code });
  },

  getGame: (code: string): Promise<ChessGame> => {
    return makeRequest(`/chess/getGame?code=${code}`);
  },

  makeMove: (values: chessMoveParams): Promise<ChessGame> => {
    return makeRequest('/chess/makeMove', { method: 'POST', body: JSON.stringify(values) });
  },
};

export default api;
