import { createContext, useContext, useEffect, useState } from 'react';

import { ChessGame } from '../types/chessGame';

const initialChessGame: ChessGame = {
  id: 0,
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

export const ChessContextProvider: React.FC = ({ children }) => {
  const [chessGame, setChessGame] = useState(initialChessGame);

  const updateGame = (newChessGame: ChessGame) => {
    setChessGame(newChessGame);
    console.log('updated game');
  };

  return (
    <ChessContext.Provider value={{ ...chessGame, updateGame }}>{children}</ChessContext.Provider>
  );
};

export default ChessContext;
