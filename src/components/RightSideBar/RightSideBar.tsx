import React, { useState, useEffect, FC } from "react"
import styles from './RightSideBar.module.css'
import HistorySection from "./HistorySection/HistorySection";
import FavoritesSection from "./FavoritesSection/FavoritesSection";
import { IMovie } from "../../types/types";

interface RightSideBarProps {
    historyMovies: IMovie[],
    favoritesMovies: IMovie[],
}

const RightSideBar: FC<RightSideBarProps> = ({historyMovies, favoritesMovies}) => {
    
    return (
        <div className={styles.rightSideBar}>
           <HistorySection histroryMovies={historyMovies}/>
           <FavoritesSection favoritesMovies={favoritesMovies}/>
        </div>
    )
};

export default RightSideBar;