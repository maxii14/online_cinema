package com.example.cinema.models;

import javax.persistence.*;

@Entity
@Table(name = "userhistory")
@Access(AccessType.FIELD)
public class UserHistory {

    public UserHistory() { }
    public UserHistory(int id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    public int id;

    @Column(name = "userid", nullable = false)
    public int userid;

    @Column(name = "movieid", nullable = false)
    public int movieid;

    @Column(name = "datewatched", nullable = false)
    public String datewatched;

    @Column(name = "stoppedontiming", nullable = false)
    public String stoppedontiming;
}
