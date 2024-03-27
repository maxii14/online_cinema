package com.example.cinema.models;

import javax.persistence.*;

@Entity
@Table(name = "movie")
@Access(AccessType.FIELD)
public class Movie {

    public Movie() { }
    public Movie(Integer id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    public int id;

    @Column(name = "imgpath")
    public String imgpath;

    @Column(name = "name")
    public String name;

    @Column(name = "description")
    public String description;

    @Column(name = "genre")
    public String genre;

    @Column(name = "country")
    public String country;

    @Column(name = "date")
    public int date;

    @Column(name = "viewsnumber")
    public int viewsnumber;

    @Column(name = "videopath")
    public String videopath;

}
