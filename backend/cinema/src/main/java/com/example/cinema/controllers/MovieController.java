package com.example.cinema.controllers;

import com.example.cinema.models.Movie;
import com.example.cinema.models.UserFavorite;
import com.example.cinema.repositories.MovieRepository;
import com.example.cinema.repositories.UserFavoritesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class MovieController {

    @Autowired
    MovieRepository movieRepository;
    @Autowired
    UserFavoritesRepository userFavoritesRepository;

    @GetMapping("/movies")
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    @GetMapping("/movies/{id}/actors")
    public List<Integer> getAllActorsOfMovie(@PathVariable ("id") Integer id) {
        return movieRepository.getActorsOfMovieById(id);
    }

    @GetMapping("/movies/userfavorites/{id}")
    public List<Integer> getUserFavorites(@PathVariable ("id") Integer id) {
        return movieRepository.getFavoritesByUserId(id);
    }

    @GetMapping("/movies/userhistory/{id}")
    public List<Object> getUserHistory(@PathVariable ("id") Integer id) {
        return movieRepository.getHistoryByUserId(id);
    }

    @PostMapping("/movies")
    public ResponseEntity<Object> createMovie(@RequestBody Movie movie) {
        Movie nc = movieRepository.save(movie);
        return new ResponseEntity<Object>(nc, HttpStatus.OK);
    }

    @PostMapping("/movies/addfavorites")
    public ResponseEntity<Object> saveNewFavorite(@RequestBody Map<String, Integer> credentials) {
        UserFavorite uf = new UserFavorite();
        uf.movieId = credentials.get("movieid");
        uf.userId = credentials.get("userid");
        UserFavorite newUf = userFavoritesRepository.save(uf);
        return new ResponseEntity<Object>(uf, HttpStatus.OK);
    }

}
