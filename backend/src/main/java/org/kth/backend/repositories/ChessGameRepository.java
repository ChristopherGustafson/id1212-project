package org.kth.backend.repositories;

import org.kth.backend.models.ChessGame;
import org.springframework.data.repository.CrudRepository;

public interface ChessGameRepository extends CrudRepository<ChessGame, Long> {

}
