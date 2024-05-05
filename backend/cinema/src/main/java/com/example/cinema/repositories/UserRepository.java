package com.example.cinema.repositories;

import com.example.cinema.models.Movie;
import com.example.cinema.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByLogin(String login);
    Optional<User> findByToken(String valueOf);

    @Transactional
    @Modifying
    @Query(value="UPDATE User u SET u.blocked = ?2 WHERE u.id = ?1", nativeQuery=false)
    void updateIsBlocked(int userId, boolean isBlocked);
}
