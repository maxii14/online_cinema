package com.example.cinema.repositories;

import com.example.cinema.models.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer>{
    @Query(value="SELECT actorid FROM movieactors WHERE movieid = ?1", nativeQuery=true)
    List<Integer> getActorsOfMovieById(Integer id);

    @Query(value="SELECT movieid FROM userfavorites WHERE userid = ?1", nativeQuery=true)
    List<Integer> getFavoritesByUserId(Integer id);

    @Query(value="SELECT id FROM userfavorites WHERE userid = ?1 AND movieid = ?2", nativeQuery=true)
    Optional<Integer> getFavoriteByUserIdAndMovieId(Integer userid, Integer movieid);

    @Query(value="SELECT movieid, stoppedontiming FROM userhistory WHERE userid = ?1", nativeQuery=true)
    List<Object> getHistoryByUserId(Integer id);

    @Transactional
    @Modifying
    @Query(value="UPDATE Movie m SET m.name = ?2, m.genre = ?3, m.description = ?4, m.date = ?5, " +
            "m.imgpath = ?6, m.videopath = ?7, m.country = ?8 WHERE m.id = ?1", nativeQuery=false)
    void updateMovie(int id, String name, String genre, String description, int date, String imgpath, String videopath, String country);

    @Modifying
    @Transactional
    @Query(value="DELETE FROM Movie WHERE id=:movieid", nativeQuery=false)
    void deleteMovie(@Param("movieid")Integer movieid);

//    @Modifying
//    @Transactional
//    @Query(value="UPDATE UserHistory inner join" +
//            "(select min(datewatched) as mindate from UserHistory group by userid) " +
//            "uhf2 on userid = ?1 and datewatched = uhf2.mindate" +
//            " SET datewatched = ?3, movieid = ?2, stoppedontiming = ?4" +
//            " where datewatched = uhf2.mindate and userid = ?1", nativeQuery=false)
//    void updateLatestUserHistoryLine(Integer userId, Integer movieId, String dateWatched, String stoppedOnTiming);
}
