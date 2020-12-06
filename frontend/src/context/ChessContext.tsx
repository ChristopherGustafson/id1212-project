import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import Chessboard from 'chessboardjsx';
import Stomp, { Message } from 'stompjs';
import { ChessInstance, Square } from 'chess.js';

import Loading from '../components/Loading';
import SnackbarContext from '../components/SnackBar';
import api from '../lib/api';

import { ChessGame } from '../types/chessGame';
import AuthContext from './AuthContext';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Chess = require('chess.js');

type squareStyles = typeof Chessboard.prototype.props.squareStyles;

interface Me {
  color: string;
  myTurn: boolean;
}
const baseWSUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:8080';

const initialChessGame: ChessGame = {
  code: '',
  chessboard: '',
  turn: '',
  gameOver: false,
  turnCount: 0,
};

const initialMe: Me = { myTurn: false, color: '' };

interface InitialValues {
  position: string;
  onDrop: typeof Chessboard.prototype.props.onDrop;
  onMouseOverSquare: typeof Chessboard.prototype.props.onMouseOverSquare;
  onMouseOutSquare: typeof Chessboard.prototype.props.onMouseOutSquare;
  me: Me;
  squareStyles: squareStyles;
}

const initialValue: InitialValues = {
  position: '',
  onDrop: () => {},
  onMouseOverSquare: () => {},
  onMouseOutSquare: () => {},
  me: initialMe,
  squareStyles: {},
};

const ChessContext = createContext(initialValue);

interface Props {
  code: string;
}

export const ChessContextProvider: React.FC<Props> = ({ children, code }) => {
  const openSnackbar = useContext(SnackbarContext);
  const { email } = useContext(AuthContext);

  const stompClient = useRef(Stomp.over(new WebSocket(`${baseWSUrl}/connect`)));

  const [chessGame, setChessGame] = useState(initialChessGame);
  const [squareStyles, setSquareStyles] = useState<squareStyles>({});
  const [me, setMe] = useState<Me>(initialMe);
  const game = useRef<ChessInstance>(new Chess());

  const updateChessGame = (newChessGame: ChessGame) => {
    setChessGame(newChessGame);
    game.current.load(newChessGame.chessboard);
  };

  // Handle square changes
  const handleMove = useCallback(
    (gameState: Message) => {
      const { state, game } = JSON.parse(gameState.body);

      switch (state) {
        case 'Valid move':
          setMe((prevState) => ({ ...prevState, myTurn: !prevState.myTurn }));
          updateChessGame(game);
          break;
        case 'Invalid move':
          openSnackbar({ content: 'Invalid move', severity: 'error' });
          break;
        default:
          openSnackbar({ content: 'Unknown message', severity: 'error' });
      }
    },
    [openSnackbar]
  );

  // Set up connection with backend
  const setUpSocket = useCallback(() => {
    const socket = new WebSocket(`${baseWSUrl}/connect`);
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect({ user: email }, (frame) => {
      stompClient.current.subscribe(`/chess/${code}`, handleMove);
      stompClient.current.subscribe(`/chess/${code}/${email}`, handleInit);
      stompClient.current.send(`/app/${code}/${email}/init`, { user: email }, '');
    });
  }, [code, email, handleMove]);

  // Fetch the game
  useEffect(() => {
    api
      .getGame(code)
      .then((newGame) => {
        updateChessGame(newGame);
        setUpSocket();
      })
      .catch((err) => {
        openSnackbar({ content: err.message, severity: 'error' });
      });
  }, [openSnackbar, code, setUpSocket]);

  const handleInit = (initMessage: Message) => {
    const { color, myTurn } = JSON.parse(initMessage.body);
    setMe({ color: color.toLowerCase(), myTurn });
  };

  const onDrop: typeof Chessboard.prototype.props.onDrop = ({ sourceSquare, targetSquare }) => {
    stompClient.current.send(
      `/app/${code}/makeMove`,
      {
        user: email,
      },
      JSON.stringify({ from: sourceSquare.toUpperCase(), to: targetSquare.toUpperCase() })
    );
  };

  const highlightSquare = (sourceSquare: Square, squaresToHighlight: Array<Square>) => {
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce((a, c) => {
      return {
        ...a,
        ...{
          [c]: {
            background: 'radial-gradient(circle, #fffc00 36%, transparent 40%)',
            borderRadius: '50%',
          },
        },
      };
    }, {});
    setSquareStyles((prevState) => ({ ...prevState, ...highlightStyles }));
  };

  const onMouseOverSquare: typeof Chessboard.prototype.props.onMouseOverSquare = (square) => {
    // Possible moves
    const moves = game.current.moves({
      square,
      verbose: true,
    });
    if (moves.length === 0) {
      return;
    }
    const squaresToHighlight = moves.map((move) => move.to);

    // Highlight possible squares
    highlightSquare(square, squaresToHighlight);
  };

  const onMouseOutSquare: typeof Chessboard.prototype.props.onMouseOutSquare = (square) => {
    setSquareStyles({});
  };

  return chessGame.chessboard === '' || me.color === '' ? (
    <Loading />
  ) : (
    <ChessContext.Provider
      value={{
        position: chessGame.chessboard,
        squareStyles,
        me,
        onDrop,
        onMouseOverSquare,
        onMouseOutSquare,
      }}
    >
      {children}
    </ChessContext.Provider>
  );
};

export default ChessContext;
