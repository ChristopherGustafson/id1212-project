package org.kth.backend.controllers;

import java.util.Optional;

import com.github.bhlangonijr.chesslib.Board;
import com.github.bhlangonijr.chesslib.Square;
import com.github.bhlangonijr.chesslib.move.Move;

import org.kth.backend.dto.ChessGameDTO;
import org.kth.backend.models.ChessGame;
import org.kth.backend.repositories.ChessGameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/chess")
public class ChessGameController {

  @Autowired
  private ChessGameRepository chessRepository;

  @GetMapping("/createGame")
  public ResponseEntity<ChessGame> createChessGame() {
    ChessGame newGame = new ChessGame();
    Board newChessboard = new Board();
    newGame.setChessboard(newChessboard.getFen());
    newGame.setGameOver(false);
    newGame.setTurn(newChessboard.getSideToMove().toString());
    newGame.setTurnCount(1);
    chessRepository.save(newGame);

    return ResponseEntity.ok(newGame);
  }

  @PostMapping("/makeMove")
  public ResponseEntity<ChessGame> makeMove(@RequestBody ChessGameDTO chessDto) {
    Optional<ChessGame> game = chessRepository.findById(chessDto.id);
    if (game.isPresent()) {
      ChessGame currentGame = game.get();
      Board currentBoard = new Board();
      currentBoard.loadFromFen(currentGame.getChessboard());

      try {
        Move attemptedMove = new Move(Square.valueOf(chessDto.from), Square.valueOf(chessDto.to));
        // Check if move is legal
        if (currentBoard.legalMoves().contains(attemptedMove)) {
          // Check if move is valid, if it is do the move
          if (currentBoard.doMove(new Move(Square.valueOf(chessDto.from), Square.valueOf(chessDto.to)), true)) {

            if (currentBoard.isMated()) {
              currentGame.setGameOver(true);
            } else if (currentBoard.isDraw()) {
              currentGame.setGameOver(true);
            } else if (currentBoard.isKingAttacked()) {
              // Handle king attacked
            }
            currentGame.setChessboard(currentBoard.getFen());
            currentGame.setTurn(currentBoard.getSideToMove().toString());
            currentGame.setTurnCount(currentGame.getTurnCount() + 1);

            chessRepository.save(currentGame);
            return ResponseEntity.ok(currentGame);
          }
        }

      } catch (Exception e) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid move");
      }
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid move");
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "This game wasn't found");
  }
}