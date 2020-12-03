import { useContext } from 'react';
import Chessboard from 'chessboardjsx';
import { styled, useTheme } from '@material-ui/core';
import api from '../lib/api';
import SnackbarContext from './SnackBar';
import ChessContext from '../context/ChessContext';
import { BreakpointValues } from '@material-ui/core/styles/createBreakpoints';

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
  //const [chessGame, setChessGame] = useState(initialChessGame];
  const theme = useTheme();

  const { code, chessboard, updateGame } = useContext(ChessContext);
  const openSnackbar = useContext(SnackbarContext);

  // useEffect(() => {
  //   api
  //     .createGame()
  //     .then(updateGame)
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  //Returns from/to square as a1, a2, e1...
  const onDrop = ({
    sourceSquare,
    targetSquare,
  }: {
    sourceSquare: string;
    targetSquare: string;
  }) => {
    //const { id } = chessGame;
    api
      .makeMove({ code, from: sourceSquare.toUpperCase(), to: targetSquare.toUpperCase() })
      .then((game) => {
        console.log(game);
        updateGame(game);
      })
      .catch((error) => {
        openSnackbar({ content: error.message, severity: 'error' });
      });
  };

  return (
    <Root>
      <Chessboard
        calcWidth={calcWidth(theme.breakpoints.values)}
        onDrop={onDrop}
        position={chessboard}
      />
    </Root>
  );
};

const Root = styled('div')(({ theme }) => ({
  height: `calc(100% - ${theme.mixins.toolbar.height})`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export default ChessBoard;
