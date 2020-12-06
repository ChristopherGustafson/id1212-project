import { styled, useTheme } from '@material-ui/core';
import { BreakpointValues } from '@material-ui/core/styles/createBreakpoints';
import Chessboard from 'chessboardjsx';
import { useContext } from 'react';
import ChessContext from '../context/ChessContext';

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

  const { onDrop, onMouseOverSquare, onMouseOutSquare, position, me, squareStyles } = useContext(
    ChessContext
  );

  return (
    <Root>
      <Chessboard
        onDrop={onDrop}
        position={position}
        draggable={me.myTurn}
        squareStyles={squareStyles}
        onMouseOverSquare={onMouseOverSquare}
        onMouseOutSquare={onMouseOutSquare}
        allowDrag={({ piece }) => piece[0] === me.color[0]}
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
