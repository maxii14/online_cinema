import React, { useState, useEffect, FC, useRef, dispatch } from "react"
import styles from "./SignInPage.module.css"
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from 'axios'

const API_SIGNIN_URL = 'http://localhost:8081/auth/login';

const LoginPage = ({type, callbackSaveUser}) => {
    
    const loginRef = useRef();
    const passwordRef = useRef();
    const emptyFieldErrorRef = useRef();
    const incorrectDataRef = useRef();
    const userIsBlockedRef = useRef();
    const nav = useNavigate();

    useEffect(() => {
        if (type == "signout") {
            localStorage.removeItem("userData");
        }
        if(localStorage.getItem("userData") !== null) {
            nav("/");
        }
    })

    const buttonHandler = () => {
        const login = loginRef.current.value;
        const password = passwordRef.current.value;

        if (login == '' || password == '') {
            emptyFieldErrorRef.current.hidden = false;
            return;
        } 

        axios.post(`${API_SIGNIN_URL}`, {login, password})
            .then (resp => {
                if(!resp.data["blocked"]) {
                    callbackSaveUser(JSON.stringify(resp.data));
                    nav("/");
                }
                else {
                    userIsBlockedRef.current.hidden = false;
                }
                
            })
            .catch( err => {
                incorrectDataRef.current.hidden = false;
            });
    }

    const inputChanged = () => {
        emptyFieldErrorRef.current.hidden = true;
        incorrectDataRef.current.hidden = true;
        userIsBlockedRef.current.hidden = true;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                <input onChange={inputChanged} type="login" placeholder="Логин" ref={loginRef} />
                <input onChange={inputChanged} type="password" placeholder="Пароль" ref={passwordRef} />
                <span className={styles.errorMessage} hidden={true} ref={emptyFieldErrorRef}>Поля не могут оставаться пустыми</span>
                <span className={styles.errorMessage} hidden={true} ref={incorrectDataRef}>Неверные данные</span>
                <span className={styles.errorMessage} hidden={true} ref={userIsBlockedRef}>Пользователь заблокирован</span>
                <button onClick={buttonHandler}> Войти </button>
                <span> Ещё не зарегистрированы?</span>
                <Link to='/signup'>
                    <b>Зарегистрироваться</b>
                </Link>
            </div>
        </div>
    )
};

export default LoginPage;