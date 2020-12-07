package org.kth.backend.controllers;

import java.util.Optional;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import javax.validation.constraints.Size;

import com.github.bhlangonijr.chesslib.Board;
import com.github.bhlangonijr.chesslib.Square;
import com.github.bhlangonijr.chesslib.move.Move;

import org.kth.backend.dto.ChessInitDTO;
import org.kth.backend.dto.ChessMoveDTO;
import org.kth.backend.dto.ChessStateDTO;
import org.kth.backend.models.ChessGame;
import org.kth.backend.repositories.ChessGameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/chess")
@Controller
public class ChessGameController {

  @Autowired
  private ChessGameRepository chessRepository;

  @PostMapping("/createGame")
  public ResponseEntity<ChessGame> createChessGame(
      @Valid @RequestBody @Size(min = 6, message = "Code must be at least 4 characters") String code, HttpSession session) {
    Optional<ChessGame> game = chessRepository.findById(code);
    if (!game.isPresent()) {
      ChessGame newGame = new ChessGame();
      newGame.setCode(code);
      Board newChessboard = new Board();
      newGame.setChessboard(newChessboard.getFen());
      newGame.setGameOver(false);
      newGame.setTurn(newChessboard.getSideToMove().toString());
      newGame.setTurnCount(1);
      newGame.setPlayerWhite((String) session.getAttribute(UserController.EMAIL_SESSION_ATTRIBUTE));
      System.out.println(newGame.getPlayerWhite());
      chessRepository.save(newGame);
      return ResponseEntity.ok(newGame);
    }

    throw new ResponseStatusException(HttpStatus.CONFLICT, "A game with this code already exists");
  }

  @GetMapping("/getGame")
  public ResponseEntity<ChessGame> getGame(@RequestParam("code") String code, HttpSession session) {
    if (!code.isBlank()) {
      Optional<ChessGame> game = chessRepository.findById(code);
      if (game.isPresent()) {
        ChessGame currentGame = game.get();
        String email = (String) session.getAttribute(UserController.EMAIL_SESSION_ATTRIBUTE);
        System.out.println(email);
        if(currentGame.getPlayerWhite().equals(email) || (currentGame.getPlayerBlack() != null && currentGame.getPlayerBlack().equals(email))){
          return ResponseEntity.ok(currentGame);
        }
        else if(currentGame.getPlayerBlack() == null || currentGame.getPlayerBlack().isEmpty()){
          currentGame.setPlayerBlack(email);
          return ResponseEntity.ok(currentGame);
        }
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Game already full");
      }
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Could not find game");
    }
    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Code is required");
  }

  
  @MessageMapping("/{code}/{email}/init")
  @SendTo("/chess/{code}/{email}")
  public ChessInitDTO chessInit(@DestinationVariable String code, @DestinationVariable String email, @Header("user") String User) {
    if (!code.isBlank()) {
      Optional<ChessGame> game = chessRepository.findById(code);
      if(game.isPresent()){
        ChessGame currentGame = game.get();
        if(currentGame.getPlayerWhite() != null && User.equals(currentGame.getPlayerWhite())){
          return new ChessInitDTO("WHITE", currentGame.getTurn().equals("WHITE"));
        }
        else if(currentGame.getPlayerBlack() != null && User.equals(currentGame.getPlayerBlack())){
          return new ChessInitDTO("BLACK", currentGame.getTurn().equals("BLACK"));
        }
      }
    }
    //ERror
    return new ChessInitDTO("Error", false);   
  }

  
  
  @MessageMapping("/{code}/makeMove")
  @SendTo("/chess/{code}")
  public ChessStateDTO makeMove(@DestinationVariable String code, ChessMoveDTO chessDto, @Header("user") String User) {
    System.out.println(code);
    Optional<ChessGame> game = chessRepository.findById(code);
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
              currentGame.setChessboard(currentBoard.getFen());
              return new ChessStateDTO(User + " wins the game", currentGame);
            } else if (currentBoard.isDraw()) {
              currentGame.setGameOver(true);
              currentGame.setChessboard(currentBoard.getFen());
              return new ChessStateDTO("Game ends in a draw", currentGame);
            } else if (currentBoard.isKingAttacked()) {
              // Handle king attacked
            }
            currentGame.setChessboard(currentBoard.getFen());
            currentGame.setTurn(currentBoard.getSideToMove().toString());
            currentGame.setTurnCount(currentGame.getTurnCount() + 1);

            chessRepository.save(currentGame);
            return new ChessStateDTO("Valid move", currentGame);
          }
        }

      } catch (Exception e) {
        return(new ChessStateDTO("Invalid move", currentGame));
      }
      return(new ChessStateDTO("Invalid move", currentGame));
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "This game wasn't found");
  }
}
