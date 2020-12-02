import { createContext, useContext, useEffect, useState } from 'react';

import Loading from '../components/Loading';
import SnackbarContext from '../components/SnackBar';
import api from '../lib/api';

import { ChessGame } from '../types/chessGame';

const initialChessGame: ChessGame = {
  code: '',
  chessboard: 'rnbqkbnr/pppppppp/8/8/P7/8/1PPPPPPP/RNBQKBNR b KQkq a3 0 1',
  turn: '',
  gameOver: false,
  turnCount: 0,
};

const initialValue = {
  ...initialChessGame,
  updateGame: (_chessGame: ChessGame) => {},
};

const ChessContext = createContext(initialValue);

interface Props {
  code: string;
}

export const ChessContextProvider: React.FC<Props> = ({ children, code }) => {
  const openSnackbar = useContext(SnackbarContext);
  const [isLoading, setIsLoading] = useState(true);
  const [chessGame, setChessGame] = useState(initialChessGame);

  useEffect(() => {
    api
      .getGame(code)
      .then((newGame) => {
        setChessGame(newGame);
        setIsLoading(false);
      })
      .catch((err) => {
        openSnackbar({ content: err.message, severity: 'error' });
      });
  }, [openSnackbar, code]);

  const updateGame = (newChessGame: ChessGame) => {
    setChessGame(newChessGame);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <ChessContext.Provider value={{ ...chessGame, updateGame }}>{children}</ChessContext.Provider>
  );
};

export default ChessContext;
