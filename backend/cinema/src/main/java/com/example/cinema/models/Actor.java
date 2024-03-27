package com.example.cinema.models;

import javax.persistence.*;

@Entity
@Table(name = "actor")
@Access(AccessType.FIELD)
public class Actor {
    public Actor() { }
    public Actor(Integer id) {
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

    @Column(name = "birthday")
    public String birthday;

    @Column(name = "country")
    public String country;
}
