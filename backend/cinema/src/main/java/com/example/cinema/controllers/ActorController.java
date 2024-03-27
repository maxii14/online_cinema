package com.example.cinema.controllers;

import com.example.cinema.repositories.ActorRepository;
import com.example.cinema.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class ActorController {

    @Autowired
    ActorRepository actorRepository;

    @GetMapping("/actors")
    public List getAllActors() {
        return actorRepository.findAll();
    }

    @GetMapping("/actors/{id}/movies")
    public List<Integer> getAllMoviesOfActor(@PathVariable("id") Integer id) {
        return actorRepository.getAllMoviesOfActor(id);
    }
}
