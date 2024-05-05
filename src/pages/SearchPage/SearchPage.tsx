import React, { useState, useEffect, FC } from "react"
import styles from "./SearchPage.module.css"
import { IActor, IMovie } from "../../types/types";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar"
import MovieListContent from "../../components/MoviesListContent/MoviesListContent";
import ActorListContent from "../../components/ActorsListContent/ActorsListContent";

interface SearchPageProps {
    movies: IMovie[],
    actors: IActor[]
}

const SearchPage: FC<SearchPageProps> = ({movies, actors}) => {

    //const [searchLine, setSearchLine] = useState<string>('')

    const [sortedMovies, setSortedMovies] = useState<IMovie[]>(movies);
    const [sortedActors, setSortedActors] = useState<IActor[]>(actors);

    useEffect(() => {

    }, [movies])

    const onChangeSearchInputHandler = (e: any) => {

        if (e.target.value === "") {
            console.log("!!")
            setSortedMovies(movies);
            setSortedActors(actors);
            return;
        }

        setSortedMovies(movies.filter(m => m.name.toLowerCase().includes(e.target.value.toLowerCase())));
        setSortedActors(actors.filter(a => a.name.toLowerCase().includes(e.target.value.toLowerCase())));
    }

    return (
        <div className={styles.contentWrapper}>
            <LeftSideBar />
            <div className={styles.content}>
                <span className={styles.title}>Поиск</span>
                <input onChange={onChangeSearchInputHandler} placeholder="Введите название фильма или имя актёра" />

                <div className={styles.components}>
                    <MovieListContent movies={sortedMovies} title="Фильмы" />
                    <ActorListContent actors={sortedActors} />
                </div>
            </div>
        </div>
    )
};

export default SearchPage;