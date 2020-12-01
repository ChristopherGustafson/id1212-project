package org.kth.backend.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class ChessGame {

  private @Id @GeneratedValue Long id;
  private String chessboard;
  String turn;
  boolean gameOver;
  int turnCount;

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
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

}
