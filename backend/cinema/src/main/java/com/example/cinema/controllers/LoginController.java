package com.example.cinema.controllers;

import com.example.cinema.models.User;
import com.example.cinema.repositories.UserRepository;
import com.example.cinema.tools.Utils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class LoginController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Map<String, String> credentials) {
        //Получаем логин и пароль из тела запроса
        String login = credentials.get("login");
        String password = credentials.get("password");
        if (!password.isEmpty() && !login.isEmpty()) {
            //Находим запись пользователя в базе данных по его логину
            Optional<User> optionalUser = userRepository.findByLogin(login);
            //Если пользователь был найден
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                //Получаем хеш пароля и соль
                String hash1 = user.password;
                String salt = user.salt;
                //Высчитываем хеш, используя только что полученный пароль и соль
                String hash2 = Utils.ComputeHash(password, salt);
                //Если хеши совпали, то пароль введён верно
                if (hash1.toLowerCase().equals(hash2.toLowerCase())) {
                    //Генерируем новый токен и записываем его в БД, а также обновляем дату активности и сохраняем
                    String token = UUID.randomUUID().toString();
                    user.token = token;
                    user.activity = LocalDateTime.now();
                    User u3 = userRepository.saveAndFlush(user);
                    //Отправляем информацию о пользователе и статус ответа ОК
                    return new ResponseEntity<Object>(u3, HttpStatus.OK);
                }
            }
        }
        //Если пользователь не был найден или хеши не совпали, то отправляем статус ответа не авторизован
        return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/logout")
    public ResponseEntity logout(@RequestHeader(value = "Authorization", required = false) String token) {
        if (token != null && !token.isEmpty()) {
            token = StringUtils.removeStart(token, "Bearer").trim();
            Optional<User> uu = userRepository.findByToken(token);
            if (uu.isPresent()) {
                User u = (User)uu.get();
                u.token = null;
                userRepository.save(u);
                return new ResponseEntity(HttpStatus.OK);
            }
        }
        return new ResponseEntity(HttpStatus.UNAUTHORIZED);
    }
}
