package com.example.cinema.models;

import javax.persistence.*;

@Entity
@Table(name = "userfavorites")
@Access(AccessType.FIELD)
public class UserFavorite {

    public UserFavorite() { }
    public UserFavorite(int id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    public int id;

    @Column(name = "userid", nullable = false)
    public int userId;

    @Column(name = "movieid", nullable = false)
    public int movieId;
}
