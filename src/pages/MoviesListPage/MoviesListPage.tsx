import React, { useState, useEffect, FC } from "react"
import styles from "./MoviesListPage.module.css"
import { IMovie } from "../../types/types";
import MovieCard from "../../components/MainPageContent/MovieCard/MovieCard";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import MovieListContent from "../../components/MoviesListContent/MoviesListContent";

interface MoviesListPageProps {
    movies: IMovie[],
    title: string,
}

const MoviesListPage: FC<MoviesListPageProps> = ({movies, title}) => {
    
    return (
        <div className={styles.contentWrapper}>
            <LeftSideBar />
            <MovieListContent movies={movies} title={title} />
        </div>
    )
};

export default MoviesListPage;