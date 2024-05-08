package com.example.cinema.repositories;

import com.example.cinema.models.UserFavorite;
import com.example.cinema.models.UserHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserHistoryRepository extends JpaRepository<UserHistory, Integer> {

}
