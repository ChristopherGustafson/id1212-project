package org.kth.backend.models;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class ChessGame {

  @Id
  private String code;

  private String chessboard;
  private String turn;
  private boolean gameOver;
  private int turnCount;
  private String playerWhite;
  private String playerBlack;

  public String getCode() {
    return this.code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public String getChessboard() {
    return this.chessboard;
  }

  public void setChessboard(String chessboard) {
    this.chessboard = chessboard;
  }

  public String getTurn() {
    return this.turn;
  }

  public void setTurn(String turn) {
    this.turn = turn;
  }

  public boolean getGameOver() {
    return this.gameOver;
  }

  public void setGameOver(boolean gameOver) {
    this.gameOver = gameOver;
  }

  public int getTurnCount() {
    return this.turnCount;
  }

  public void setTurnCount(int turnCount) {
    this.turnCount = turnCount;
  }

  public String getPlayerWhite() {
    return this.playerWhite;
  }

  public void setPlayerWhite(String playerWhite) {
    this.playerWhite = playerWhite;
  }

  public String getPlayerBlack() {
    return this.playerBlack;
  }

  public void setPlayerBlack(String playerBlack) {
    this.playerBlack = playerBlack;
  }
}
