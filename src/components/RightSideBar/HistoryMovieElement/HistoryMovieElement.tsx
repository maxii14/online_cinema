import React, { useState, useEffect, FC } from "react"
import { IMovie } from "../../../types/types";
import styles from "../RightSideBar.module.css"
import { Link } from "react-router-dom";

interface HistoryMovieElement {
    movie: IMovie
}

const HistoryMovieElement: FC<HistoryMovieElement> = ({movie}) => {
    
    return (
        <Link to={`/movie/${movie.id}`} >
            <div className={styles.movieContainer}>
                <div className={styles.movieImage}>
                    <img src={movie.imgpath} alt="Фото не найдено" />
                </div>
                <div className={styles.movieInfo}>
                    <span className={styles.movieName}>{movie.name}</span>
                    <span className={styles.genre}>{movie.genre}</span>
                    <span className={styles.watchedToTime}>Просмотрено до {movie["stoppedontiming"]}</span>
                </div>
            </div>
        </Link>
    )
};

export default HistoryMovieElement;