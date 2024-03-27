import React, { useState, useEffect, FC } from "react"
import MovieCard from "../MovieCard/MovieCard";
import { IMovie } from "../../../types/types";
import styles from './PopularMoviesList.module.css'

interface MoviesListProps {
    movies: IMovie[];
}

const MoviesList: FC<MoviesListProps> = ({movies}) => {
    
    return (
        <div className="popularMovies">
            <b>Популярные</b>
            <div className={styles.popularMoviesList}>
                {movies.length ? movies.map(movie => (
                    <MovieCard 
                        key={movie.id}
                        movie={movie}
                    />
                )) : <p>Ошибка. Фильмы не найдены.</p>}
            </div>

        </div>
    )
};

export default MoviesList;