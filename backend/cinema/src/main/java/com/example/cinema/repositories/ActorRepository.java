package com.example.cinema.repositories;

import com.example.cinema.models.Actor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ActorRepository extends JpaRepository<Actor, Integer> {
    @Query(value="SELECT movieid FROM movieactors WHERE actorid = ?1", nativeQuery=true)
    List<Integer> getAllMoviesOfActor(Integer id);
}
