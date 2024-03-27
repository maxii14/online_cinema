import React, { useState, useEffect, FC } from "react"
import styles from '../RightSideBar.module.css'
import { IMovie } from "../../../types/types";
import FavoritesMovieElement from "../FavoritesMovieElement/FavoritesMovieElement";
import { Link } from "react-router-dom";

interface FavoritesSectionProps {
    favoritesMovies: IMovie[]
}

const FavoritesSection: FC<FavoritesSectionProps> = ({favoritesMovies}) => {
    
    return (
        <div className={styles.section}>
           <span className={styles.sectionTitle}>Избранное</span>
           {favoritesMovies.length ? favoritesMovies.map(movie => (
                <FavoritesMovieElement 
                    key={movie.id}
                    movie={movie}
                />
            )) : <p>Ошибка. Фильмы не найдены.</p>}
            <Link to={`/movies/favorites`} >
                <button className={styles.showFullListButton}>Посмотреть весь список</button>
            </Link>
        </div>
    )
};

export default FavoritesSection;