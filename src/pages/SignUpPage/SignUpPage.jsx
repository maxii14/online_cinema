import React, { useState, useEffect, FC, useRef } from "react"
import styles from "./SignUpPage.module.css"
import { Link } from "react-router-dom";
import axios from 'axios'

const SignUp = () => {

    const API_SIGNUP_URL = 'http://localhost:8081/auth/newuser';
    
    const loginRef = useRef();
    const passwordRef = useRef();
    const errorRef = useRef();

    const buttonHandler = () => {
        const login = loginRef.current.value;
        const password = passwordRef.current.value;

        if (login == '' || password == '') {
            errorRef.current.hidden = false;
            return;
        }

        axios.post(`${API_SIGNUP_URL}`, {login, password})
            .then (resp => {
                //callbackSaveUser(JSON.stringify(resp.data));
                //nav("/");    
                console.log(resp);
            })
            .catch(err => {
                
            });

        //axios.post(`http://localhost:8081/login`, {login, password});
    }

    const inputChanged = () => {
        errorRef.current.hidden = true;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                <input onChange={inputChanged} type="login" placeholder="Логин" ref={loginRef} />
                <input onChange={inputChanged} type="password" placeholder="Пароль" ref={passwordRef} />
                <span className={styles.errorMessage} hidden={true} ref={errorRef}>Поля не могут оставаться пустыми</span>
                <button onClick={buttonHandler}> Зарегистрироваться </button>
                <span> Уже зарегистрированы?</span>
                <Link to='/signin'>
                    <b>Авторизоваться</b>
                </Link>
            </div>
        </div>
    )
};

export default SignUp;