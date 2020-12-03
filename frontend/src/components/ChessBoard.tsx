import { styled, useTheme } from '@material-ui/core';
import { BreakpointValues } from '@material-ui/core/styles/createBreakpoints';
import Chessboard from 'chessboardjsx';
import { useContext, useEffect, useRef, useState } from 'react';
import { Message } from 'stompjs';
import ChessContext from '../context/ChessContext';
import SnackbarContext from './SnackBar';
import Stomp from 'stompjs';

/*
const initialChessGame: ChessGame = {
  id: 0,
  chessboard: 'rnbqkbnr/pppppppp/8/8/P7/8/1PPPPPPP/RNBQKBNR b KQkq a3 0 1',
  turn: '',
  gameOver: false,
  turnCount: 0,
};
*/

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

const ChessBoard: React.FC = () => {
  const theme = useTheme();

  const [myTurn, setMyTurn] = useState(false);
  const { code, chessboard, updateGame } = useContext(ChessContext);
  const openSnackbar = useContext(SnackbarContext);
  const stompClient = useRef(Stomp.over(new WebSocket('ws://localhost:8080/connect')));

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/connect');
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect({}, (frame) => {
      console.log('Connected ' + frame);
      stompClient.current.subscribe('/chess/start', handleStart);
      stompClient.current.subscribe('/chess/msg', handleMove);
      openSnackbar({ content: 'Waiting for other player', severity: 'info' });
    });
  }, []);

  const handleStart = (gameState: Message) => {
    console.log('handling move');
    console.log(JSON.parse(gameState.body));
    const { state, game } = JSON.parse(gameState.body);

    switch (state) {
      case 'Valid move':
        console.log('Valid move');
        //setMyTurn(!myTurn);
        return updateGame(game);
      case 'Invalid move':
        openSnackbar({ content: 'Invalid move', severity: 'error' });
        return game;
      default:
        openSnackbar({ content: 'Unkown message', severity: 'error' });
    }

    //return updateGame(game);
  };

  const handleMove = (gameState: Message) => {
    console.log('handling move');
    console.log(JSON.parse(gameState.body));
    const { state, game } = JSON.parse(gameState.body);

    switch (state) {
      case 'Valid move':
        console.log('Valid move');
        //setMyTurn(!myTurn);
        return updateGame(game);
      case 'Invalid move':
        openSnackbar({ content: 'Invalid move', severity: 'error' });
        return game;
      default:
        openSnackbar({ content: 'Unkown message', severity: 'error' });
    }

    //return updateGame(game);
  };

  //Returns from/to square as a1, a2, e1...
  const onDrop = ({
    sourceSquare,
    targetSquare,
  }: {
    sourceSquare: string;
    targetSquare: string;
  }) => {
    console.log('here');
    if (typeof stompClient !== 'undefined') {
      stompClient.current.send(
        '/app/makeMove',
        {},
        JSON.stringify({ code, from: sourceSquare.toUpperCase(), to: targetSquare.toUpperCase() })
      );
    }
    console.log(stompClient);
  };

  return (
    <Root>
      <Chessboard
        onDrop={onDrop}
        position={chessboard}
        draggable={myTurn}
        calcWidth={calcWidth(theme.breakpoints.values)}
      />
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
