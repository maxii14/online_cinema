import React, { useState, useEffect, FC } from "react"
import { IMovie } from "../../types/types";
import styles from "./MoviesListContent.module.css"
import MovieCard from "../MainPageContent/MovieCard/MovieCard";

interface MoviesListContentProps {
    movies: IMovie[],
    title: string
}

const MovieListContent: FC<MoviesListContentProps> = ({movies, title}) => {
    
    return (
        <div className={styles.moviesListContent}>
           {movies.length ? <span className={styles.title}>{title}</span> : <p>Ошибка. Фильмы с этой категорией не найдены.</p>}
           <div className={styles.moviesList}>
                {movies.length ? movies.map(movie => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                    />
                )) : <></>}
            </div>
        </div>
    )
};

export default MovieListContent;