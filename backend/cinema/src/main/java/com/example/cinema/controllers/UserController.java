package com.example.cinema.controllers;

import com.example.cinema.models.User;
import com.example.cinema.repositories.MovieRepository;
import com.example.cinema.repositories.UserRepository;
import com.example.cinema.tools.Utils;
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
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    UserRepository userRepository;

//    @PostMapping("/user")
//    public ResponseEntity<Object> createUser(@RequestBody User user) {
//        try {
//            User nc = userRepository.save(user);
//            return new ResponseEntity<Object>(nc, HttpStatus.OK);
//        }
//        catch (Exception ex) {
//            String error;
//            if (ex.getMessage().contains("users.name_UNIQUE"))
//                error = "useralreadyexists";
//            else
//                error = "undefinederror";
//
//            Map<String, String> map = new HashMap<>();
//            map.put("error", error);
//            return ResponseEntity.ok(map);
//        }
//    }

    @PostMapping("/newuser")
    public ResponseEntity<Object> createUser(@RequestBody Map<String, String> credentials) {
        //Получаем логин и пароль из тела запроса
        String login = credentials.get("login");
        String password = credentials.get("password");
        //Формируем соль, хеш и токен
        String salt = String.valueOf(ThreadLocalRandom.current().nextInt(0, 10)) + ThreadLocalRandom.current().nextInt(0, 10);
        String hash = Utils.ComputeHash(password, salt);
        String token = UUID.randomUUID().toString();

        //Заполняем поля
        User user = new User();
        user.login = login;
        user.password = hash;
        user.salt = salt;
        user.token = token;
        user.activity = LocalDateTime.now();
        user.role = "USER";
        user.blocked = false;
        try {
            User userToSave = userRepository.save(user);
            return new ResponseEntity<Object>(userToSave, HttpStatus.OK);
        }
        catch (Exception ex) {
            String error;
            if (ex.getMessage().contains("users.name_UNIQUE")) {
                error = "Пользователь уже существует";
            }
            else {
                error = "Ошибка";
            }

            Map<String, String> map = new HashMap<>();
            map.put("error", error);
            return ResponseEntity.ok(map);
        }
    }

    /*@PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable(value = "id") Integer userId, @RequestBody User userDetails) throws Exception {

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
    public ResponseEntity<Object> deleteUser(@PathVariable(value = "id") Integer userId) {
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
