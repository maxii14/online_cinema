package com.example.cinema.sometesting;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import static java.util.stream.Collectors.*;

public class Testing {

    public static void main(String[] args) {

        Stream.of(1, 2, 3, 4)
                .filter(i -> i % 2 == 0)
                .map(i -> {
                    System.out.println("Here we are");
                    return Integer.toString(i);
                });

    }

}
