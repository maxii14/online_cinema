package com.example.cinema.repositories;

import com.example.cinema.models.Movie;
import com.example.cinema.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByLogin(String login);
    Optional<User> findByToken(String valueOf);
}
