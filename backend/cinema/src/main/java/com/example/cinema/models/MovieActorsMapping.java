package com.example.cinema.models;

import javax.persistence.*;

@Entity
@Table(name = "movieactors")
@Access(AccessType.FIELD)
public class MovieActorsMapping {
    public MovieActorsMapping() { }
    public MovieActorsMapping(int id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    public int id;

    @Column(name = "movieid", nullable = false)
    public int movieId;

    @Column(name = "actorid", nullable = false)
    public int actorid;
}
