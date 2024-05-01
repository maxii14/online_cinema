import React, { useState, useEffect, FC } from "react"
import { IMovie } from "../../types/types";
import styles from "./MoviesEditListContent.module.css"
import MovieCardEdit from "../MainPageContent/MovieCardEdit/MovieCardEdit";

interface MoviesListContentProps {
    movies: IMovie[],
}

const MovieListContent: FC<MoviesListContentProps> = ({movies}) => {
    
    return (
        <div className={styles.moviesEditListContent}>
           <div className={styles.moviesEditList}>
                {movies.length ? movies.map(movie => (
                    <MovieCardEdit
                        key={movie.id}
                        movie={movie}
                    />
                )) : <></>}
            </div>
        </div>
    )
};

export default MovieListContent;