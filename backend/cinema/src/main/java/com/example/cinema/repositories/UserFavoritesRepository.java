package com.example.cinema.repositories;

import com.example.cinema.models.Movie;
import com.example.cinema.models.UserFavorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface UserFavoritesRepository extends JpaRepository<UserFavorite, Integer> {
    @Modifying
    @Transactional
    @Query(value="DELETE FROM UserFavorite WHERE userId=:userid AND movieId=:movieid", nativeQuery=false)
    void deleteFavoritesByUserIdAndMovieId(@Param("userid")Integer userid, @Param("movieid")Integer movieid);
}
