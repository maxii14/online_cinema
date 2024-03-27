import React, { useState, useEffect, FC, ReactNode } from "react"
import styles from './MainPage.module.css'
import MainPageContent from "../../components/MainPageContent/MainPageContent";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import { IMovie } from "../../types/types";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const API_URL = 'http://localhost:8081/api/v1'

interface MainPageProps {
    movies: IMovie[],
    favoritesMovies: IMovie[],
    historyMovies: IMovie[]
}

const MainPage: FC<MainPageProps> = ({movies, favoritesMovies, historyMovies}) => {
    
    const nav = useNavigate();

    useEffect(() => {
        var userData = localStorage.getItem('userData');
        if(userData === null) {
            nav('/signin');
            return;
        } 
    }, [movies, favoritesMovies, historyMovies]);

    return (
        <div className={styles.contentWrapper}>
            <LeftSideBar />
            <MainPageContent movies={movies.filter((movie) => movie.viewsnumber >= 1000000)} />
            <RightSideBar historyMovies={historyMovies.slice(0, 3)} favoritesMovies={favoritesMovies.slice(0, 3)} />
        </div>
    )
};

export default MainPage;