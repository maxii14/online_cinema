package com.example.cinema.tools;

import org.springframework.security.crypto.codec.Hex;

import java.security.MessageDigest;

public class Utils {
    public static String ComputeHash(String password, String salt)
    {
        MessageDigest digest;
        byte[] bytes = Hex.decode(new String(Hex.encode(password.getBytes())) + salt);
        try {
            //Создаём дайджест сообщения и выбираем алгоритм
            digest = MessageDigest.getInstance("SHA-256");
        }
        catch (Exception ex) {
            return "";
        }
        //Высчитываем дайджест (хеш) строки и возвращаем её
        return new String(Hex.encode(digest.digest(bytes)));
    }
}
