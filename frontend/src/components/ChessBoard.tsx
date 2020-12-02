import { useContext } from 'react';
import Chessboard from 'chessboardjsx';
import { styled } from '@material-ui/core';
import api from '../lib/api';
import SnackbarContext from './SnackBar';
import ChessContext from '../context/ChessContext';

/*
const initialChessGame: ChessGame = {
  id: 0,
  chessboard: 'rnbqkbnr/pppppppp/8/8/P7/8/1PPPPPPP/RNBQKBNR b KQkq a3 0 1',
  turn: '',
  gameOver: false,
  turnCount: 0,
};
*/

const ChessBoard: React.FC = () => {
  //const [chessGame, setChessGame] = useState(initialChessGame];
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
      <Chessboard onDrop={onDrop} position={chessboard} />
    </Root>
  );
};

const Root = styled('div')({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export default ChessBoard;
