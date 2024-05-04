package com.example.cinema.repositories;

import com.example.cinema.models.MovieActorsMapping;
import com.example.cinema.models.UserFavorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface MovieActorsMappingRepository extends JpaRepository<MovieActorsMapping, Integer> {
    @Modifying
    @Transactional
    @Query(value="DELETE FROM MovieActorsMapping WHERE movieId=:movieid", nativeQuery=false)
    void deleteAllActorsOfMovieByMovieId(@Param("movieid")Integer movieid);
}
