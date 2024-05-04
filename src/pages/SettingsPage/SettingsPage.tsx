import React, { useState, useEffect, useRef, FC } from "react"
import styles from './SettingsPage.module.css'
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import { IMovie, IActor } from "../../types/types";
import ActorEditListContent from "../../components/ActorsListContent/ActorsEditListContet";
import MovieEditListContent from "../../components/MoviesListContent/MoviesEditListContent";
import { Link } from "react-router-dom";

interface SettingsPageProps {
    movies: IMovie[],
    actors: IActor[]
}

const SettingsPage: FC<SettingsPageProps> = ({movies, actors}) => {
    
    const moviesTabRef = useRef<HTMLButtonElement>(null);
    const actorsTabRef = useRef<HTMLButtonElement>(null);
    const usersTabRef = useRef<HTMLButtonElement>(null);
    const moviesComponentRef = useRef<HTMLDivElement>(null);
    const actorsComponentRef = useRef<HTMLDivElement>(null);
    const usersComponentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        moviesTabRef.current!.style.backgroundColor = "#696A71";

        moviesComponentRef.current!.hidden = false;
        actorsComponentRef.current!.hidden = true;
        usersComponentRef.current!.hidden = true;
    }, [movies])

    const buttonMoviesHandler = () => {
        //Подсветка
        moviesTabRef.current!.style.backgroundColor = "#696A71";
        actorsTabRef.current!.style.backgroundColor = "#26272B";
        usersTabRef.current!.style.backgroundColor = "#26272B";

        //Отображение списка
        moviesComponentRef.current!.hidden = false;
        actorsComponentRef.current!.hidden = true;
        usersComponentRef.current!.hidden = true;
    }

    const buttonActorsHandler = () => {
        //Подсветка
        moviesTabRef.current!.style.backgroundColor = "#26272B";
        actorsTabRef.current!.style.backgroundColor = "#696A71";
        usersTabRef.current!.style.backgroundColor = "#26272B";

        //Отображение списка
        moviesComponentRef.current!.hidden = true;
        actorsComponentRef.current!.hidden = false;
        usersComponentRef.current!.hidden = true;
    }

    const buttonUsersHandler = () => {
        //Подсветка
        moviesTabRef.current!.style.backgroundColor = "#26272B";
        actorsTabRef.current!.style.backgroundColor = "#26272B";
        usersTabRef.current!.style.backgroundColor = "#696A71";

        //Отображение списка
        moviesComponentRef.current!.hidden = true;
        actorsComponentRef.current!.hidden = true;
        usersComponentRef.current!.hidden = false;
    }

    return (
        <div className={styles.contentWrapper}>
            <LeftSideBar />
            {(JSON.parse(localStorage['userData']).role === 'ADMIN') 
            ? <div className={styles.tabsAndComponentWrapper}>
                <span className={styles.title}>Настройки</span>
                <div className={styles.tabs}>
                    <button ref={moviesTabRef} onClick={buttonMoviesHandler}> Фильмы </button>
                    <button ref={actorsTabRef} onClick={buttonActorsHandler}> Актёры </button>
                    <button ref={usersTabRef} onClick={buttonUsersHandler}> Пользователи </button>    
                </div>
                <div className={styles.component}>
                    <div ref={moviesComponentRef} className={styles.movieList}>
                        <Link to='/addmovie'>
                            <button>Добавить фильм</button>
                        </Link>
                        <MovieEditListContent movies={movies} />
                    </div>
                    <div ref={actorsComponentRef} className={styles.actorList}>
                        <Link to='/addactor'>
                            <button>Добавить актёра</button>
                        </Link>
                        <ActorEditListContent actors={actors} />
                    </div>
                    <div ref={usersComponentRef} className={styles.usersList}>Users</div>
                </div>
            </div>
            : <p>Админ-панель доступна только для администраторов сервиса.</p>}
        </div>
    )
};

export default SettingsPage;