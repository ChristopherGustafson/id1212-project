package org.kth.backend.dto;

public class ChessInitDTO {

  public String color;
  public boolean myTurn;

  public ChessInitDTO(String color, boolean myTurn) {
    this.color = color;
    this.myTurn = myTurn;
  }

}
