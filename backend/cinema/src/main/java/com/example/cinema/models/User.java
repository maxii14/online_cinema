package com.example.cinema.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user")
@Access(AccessType.FIELD)
public class User {

    public User() { }
    public User(Long id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    public long id;

    @Column(name = "login", nullable = false, unique = true)
    public String login;

    @JsonIgnore
    @Column(name = "password")
    public String password;

    @JsonIgnore
    @Column(name = "salt")
    public String salt;

    @Column(name = "token")
    public String token;

    @Column(name = "activity")
    public LocalDateTime activity;

    @Column(name = "role")
    public String role;

    @Column(name = "blocked")
    public boolean blocked;
}
