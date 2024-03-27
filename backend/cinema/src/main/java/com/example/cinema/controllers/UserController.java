package com.example.cinema.controllers;

import com.example.cinema.models.User;
import com.example.cinema.repositories.MovieRepository;
import com.example.cinema.repositories.UserRepository;
import org.aspectj.weaver.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.codec.Hex;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.MessageDigest;
import java.util.*;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    UserRepository userRepository;

//    @GetMapping("/users")
//    public Page<User> getAllUsers(@RequestParam("page") int page, @RequestParam("limit") int limit) {
//        return userRepository.findAll(PageRequest.of(page, limit, Sort.by(Sort.Direction.ASC, "login")));
//    }

    @PostMapping("/users")
    public ResponseEntity<Object> createUser(@RequestBody User user) {
        try {
            User nc = userRepository.save(user);
            return new ResponseEntity<Object>(nc, HttpStatus.OK);
        }
        catch (Exception ex) {
            String error;
            if (ex.getMessage().contains("users.name_UNIQUE"))
                error = "useralreadyexists";
            else
                error = "undefinederror";

            Map<String, String> map = new HashMap<>();
            map.put("error", error);
            return ResponseEntity.ok(map);
        }
    }

    /*@PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable(value = "id") Long userId, @RequestBody User userDetails) throws Exception {

        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new Exception(" Пользователь с таким индексом не найден"));
            String np = userDetails.np;
            if (np != null  && !np.isEmpty()) {
                byte[] b = new byte[32];
                new Random().nextBytes(b);
                String salt = new String(Hex.encode(b));
                user.password = ComputeHash(np, salt);
                user.salt = salt;
            }
            userRepository.save(user);
            return ResponseEntity.ok(user);
        }
        catch (Exception ex) {
            String error;
            if (ex.getMessage().contains("users.email_UNIQUE"))
                throw new Exception("Пользователь с такой почтой уже есть в базе");
            else
                throw new Exception("Неизвестная ошибка");
        }
    }*/

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable(value = "id") Long userId) {
        Optional<User> user = userRepository.findById(userId);
        Map<String, Boolean> resp = new HashMap<>();
        if (user.isPresent()) {
            userRepository.delete(user.get());
            resp.put("deleted", Boolean.TRUE);
        }
        else
            resp.put("deleted", Boolean.FALSE);
        return ResponseEntity.ok(resp);
    }
}
