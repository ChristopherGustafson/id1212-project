import { loginParams } from '../types/api';
import { User } from '../types/user';

const baseApiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';

function makeRequest<T>(endpoint: string, init?: RequestInit): Promise<T> {
  return fetch(`${baseApiUrl}${endpoint}`, {
    ...init,
    headers: { 'Content-Type': 'application/json' },
  }).then(async (res) => {
    const data = await res.json();

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
};

export default api;
