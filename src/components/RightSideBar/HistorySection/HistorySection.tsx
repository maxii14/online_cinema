import React, { useState, useEffect, FC } from "react"
import styles from '../RightSideBar.module.css'
import { IMovie } from "../../../types/types";
import HistoryMovieElement from "../HistoryMovieElement/HistoryMovieElement";
import { Link } from 'react-router-dom'

interface HistorySectionProps {
    histroryMovies: IMovie[]
}

const HistorySection: FC<HistorySectionProps> = ({histroryMovies}) => {
    
    return (
        <div className={styles.section}>
           <span className={styles.sectionTitle}>История просмотров </span>
            {histroryMovies.length ? histroryMovies.map(movie => (
                <HistoryMovieElement 
                    key={movie.id}
                    movie={movie}
                />
            )) : <p>Список пуст.</p>}
            <Link to={`/movies/history`} >
                <button className={styles.showFullListButton}>Посмотреть весь список</button>
            </Link>
        </div>
    )
};

export default HistorySection;