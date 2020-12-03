package org.kth.backend.dto;

import org.kth.backend.models.ChessGame;

public class ChessStateDTO {

  public String state;
  public ChessGame game;

  public ChessStateDTO(String state, ChessGame game) {
    this.state = state;
    this.game = game;
  }
  
}
