import React, { useState, useEffect, FC } from "react"
import styles from './MovieCardEdit.module.css'
import { IMovie } from "../../../types/types";
import { Link } from 'react-router-dom';

interface MovieCardProps {
    movie: IMovie;
}

const MovieCard: FC<MovieCardProps> = ({movie}) => {

    return (
        
        <div className={styles.movieCardEdit} title={movie.name}>
            <Link to={`/editmovie/${movie.id}`}>
                <img src={movie.imgpath} alt="Фото не найдено" />
            </Link>
        </div>
        
    )
};

export default MovieCard;