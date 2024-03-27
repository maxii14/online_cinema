import React, { useState, useEffect, FC } from "react"
import PopularMoviesList from "./PopularMoviesList/PopularMoviesList";
import { IMovie } from "../../types/types";
import styles from './MainPageContent.module.css'

interface MainContentProps {
    movies: IMovie[]
}

const MainPageContent: FC<MainContentProps> = ({movies}) => {
    
    return (
        <div className={styles.mainContent}>
            <PopularMoviesList movies={movies} />  
        </div>
    )
};

export default MainPageContent;