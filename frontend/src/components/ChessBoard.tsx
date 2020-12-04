import { styled, useTheme } from '@material-ui/core';
import { BreakpointValues } from '@material-ui/core/styles/createBreakpoints';
import Chessboard from 'chessboardjsx';
import { useContext, useEffect, useRef, useState } from 'react';
import { Message } from 'stompjs';
import ChessContext from '../context/ChessContext';
import SnackbarContext from './SnackBar';
import Stomp from 'stompjs';
import AuthContext from '../context/AuthContext';
import Loading from './Loading';

const SMALL_SCREEN_PADDING = 100;
const SMALL_SCREEN_HEIGHT_PADDING = 100;

const LARGE_SCREEN_PADDING = 400;
const LARGE_SCREEN_HEIGHT_PADDING = 200;

const calcWidth = (breakpoints: BreakpointValues): typeof Chessboard.prototype.props.calcWidth => ({
  screenWidth,
  screenHeight,
}) => {
  if (screenWidth <= breakpoints.sm) {
    return Math.min(screenWidth - SMALL_SCREEN_PADDING, screenHeight - SMALL_SCREEN_HEIGHT_PADDING);
  }
  return Math.min(screenWidth - LARGE_SCREEN_PADDING, screenHeight - LARGE_SCREEN_HEIGHT_PADDING);
};

const baseWSUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:8080';

const ChessBoard: React.FC = () => {
  const theme = useTheme();

  const [myTurn, setMyTurn] = useState(false);
  const [myColor, setColor] = useState('');
  const { code, chessboard, updateGame } = useContext(ChessContext);
  const { email } = useContext(AuthContext);
  const openSnackbar = useContext(SnackbarContext);
  const stompClient = useRef(Stomp.over(new WebSocket(`${baseWSUrl}/connect`)));

  useEffect(() => {
    const socket = new WebSocket(`${baseWSUrl}/connect`);
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect({ user: email }, (frame) => {
      //stompClient.current.subscribe('/chess/start', handleStart);
      stompClient.current.subscribe(`/chess/${code}`, handleMove);
      stompClient.current.subscribe(`/chess/${code}/${email}`, handleInit);
      stompClient.current.send(`/app/${code}/${email}/init`, { user: email }, '');
    });
  }, []);

  const handleInit = (initMessage: Message) => {
    const { color, myTurn } = JSON.parse(initMessage.body);
    setColor(color.toLowerCase());
    setMyTurn(myTurn);
  };

  const handleMove = (gameState: Message) => {
    const { state, game } = JSON.parse(gameState.body);

    switch (state) {
      case 'Valid move':
        setMyTurn((prevState) => !prevState);
        return updateGame(game);
      case 'Invalid move':
        openSnackbar({ content: 'Invalid move', severity: 'error' });
        return game;
      default:
        openSnackbar({ content: 'Unkown message', severity: 'error' });
    }
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
  return (
    <Root>
      {myColor === '' ? (
        <Loading />
      ) : (
        <Chessboard
          onDrop={onDrop}
          position={chessboard}
          draggable={myTurn}
          allowDrag={({ piece }) => piece[0] === myColor[0]}
          calcWidth={calcWidth(theme.breakpoints.values)}
        />
      )}
    </Root>
  );
};

const Root = styled('div')(({ theme }) => ({
  height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export default ChessBoard;
