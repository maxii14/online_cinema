package com.example.cinema.controllers;

import com.example.cinema.models.Movie;
import com.example.cinema.models.User;
import com.example.cinema.models.UserFavorite;
import com.example.cinema.repositories.MovieRepository;
import com.example.cinema.repositories.UserFavoritesRepository;
import com.example.cinema.repositories.UserRepository;
import com.example.cinema.services.StreamingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class MovieController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    MovieRepository movieRepository;
    @Autowired
    UserFavoritesRepository userFavoritesRepository;
    @Autowired
    StreamingService streamingService;

    @GetMapping(value = "movie/{title}", produces = "video/mp4")
    public Mono<Resource> getVideoChunk(@PathVariable String title) {
        System.out.println(title);
        return streamingService.getVideo(title);
    }

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

    @PutMapping("/movies/update")
    public ResponseEntity<Object> updateMovie(@RequestBody Map<String, String> credentials) {

        System.out.println(Integer.parseInt(credentials.get("id")));
        movieRepository.updateMovie(
                Integer.parseInt(credentials.get("id")),
                credentials.get("name"),
                credentials.get("genre"),
                credentials.get("description"),
                Integer.parseInt(credentials.get("date")),
                credentials.get("imgpath"),
                credentials.get("videopath"),
                credentials.get("country"));

        return new ResponseEntity<Object>("Updated successfully", HttpStatus.OK);
    }

    @DeleteMapping("/movies/deletefavorite")
    public ResponseEntity<Object> deleteFav(@RequestBody Map<String, Integer> credentials) {
        Integer userId = credentials.get("userid");
        Integer movieId = credentials.get("movieid");
        Optional<User> user = userRepository.findById(Long.valueOf(userId));
        Optional<Movie> movie = movieRepository.findById(movieId);
        Optional<Integer> favoriteLineId = movieRepository.getFavoriteByUserIdAndMovieId(userId, movieId);

        Map<String, Boolean> resp = new HashMap<>();

        if (user.isPresent() && movie.isPresent() && favoriteLineId.isPresent()) {
            userFavoritesRepository.deleteFavoritesByUserIdAndMovieId(userId, movieId);
            resp.put("deleted", Boolean.TRUE);
        }
        else {
            resp.put("deleted", Boolean.FALSE);
        }

        return ResponseEntity.ok(resp);
    }

}
