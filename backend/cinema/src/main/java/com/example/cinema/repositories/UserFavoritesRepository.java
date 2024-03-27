package com.example.cinema.repositories;

import com.example.cinema.models.Movie;
import com.example.cinema.models.UserFavorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserFavoritesRepository extends JpaRepository<UserFavorite, Integer> {
}
