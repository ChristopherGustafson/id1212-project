import { loginParams } from '../types/api';
import { User } from '../types/user';

const fakeUser = {
  email: 'faker@fakesson.se',
  password: 'asd',
  games: {},
};

type fakeApiResponse<T> = Promise<{ json: () => Promise<T> }>;

function createFakeResponse<T>(obj: T): fakeApiResponse<T> {
  return Promise.resolve({
    json: () => Promise.resolve(obj),
  });
}

const api = {
  login: (_values: loginParams): fakeApiResponse<User> => createFakeResponse(fakeUser),
};

export default api;
