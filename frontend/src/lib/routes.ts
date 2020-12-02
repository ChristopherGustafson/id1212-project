export const LOGIN = '/login';

export const CREATE_GAME = '/create';

export const JOIN_GAME = '/join';

export const PLAY_GAME = '/game/:code';

export const createPlayUrl = (code: string): string => PLAY_GAME.replace(':code', code);
