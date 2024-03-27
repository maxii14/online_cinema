package com.example.cinema.repositories;

import com.example.cinema.models.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer>{
    @Query(value="SELECT actorid FROM movieactors WHERE movieid = ?1", nativeQuery=true)
    List<Integer> getActorsOfMovieById(Integer id);

    @Query(value="SELECT movieid FROM userfavorites WHERE userid = ?1", nativeQuery=true)
    List<Integer> getFavoritesByUserId(Integer id);

    @Query(value="SELECT movieid, stoppedontiming FROM userhistory WHERE userid = ?1", nativeQuery=true)
    List<Object> getHistoryByUserId(Integer id);

    /*@Query(value="UPDATE cinema.userhistory\n" +
            "inner join\n" +
            "(\n" +
            "select min(datewatched) as mindate\n" +
            "from cinema.userhistory\n" +
            "group by userid\n" +
            ") uhf2 on cinema.userhistory.userid = ?1 and cinema.userhistory.datewatched = uhf2.mindate\n" +
            "SET datewatched = ?2\n" +
            "where datewatched = uhf2.mindate and userid = ?1", nativeQuery=true)
    List<Integer> getActorsOfMovieById1(Integer id);*/
}
