import React, { useState, useEffect, FC } from "react"
import { IActor, IMovie } from "../../types/types";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import styles from "./ActorPage.module.css"
import ActorInfo from "../../components/ActorInfo/ActorInfo";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import MovieListContent from "../../components/MoviesListContent/MoviesListContent";

const API_URL = 'http://localhost:8081/api/v1'

interface ActorPageProps {
    movies: IMovie[],
    actors: IActor[]
}

const ActorPage: FC<ActorPageProps> = ({movies, actors}) => {
    
    const { id } = useParams()
    const [actor, setActor] = useState<IActor>(actors[0])
    const [moviesList, setMoviesList] = useState<IMovie[]>([])
    const nav = useNavigate();

    useEffect(() => {
        var userData = localStorage.getItem('userData');
        if(userData === null) {
            nav('/signin'); 
        }
        if(!id || actors.length == 0) return;

        actors.forEach(a => {
            if (a.id.toString() == id && userData !== null) 
            {
                setActor(a); 

                //Получаем фильмы, в которых участвовал актёр
                axios.get(`${API_URL}/actors/${a.id}/movies`, {headers : {Authorization : JSON.parse(userData).token}})
                .then(response => {
                    
                    const pickMoviesArray: IMovie[] = []
                    movies.forEach(m => {
                        if(response.data.includes(m.id))
                        {
                            pickMoviesArray.push(m)
                        }                    
                    });
                    setMoviesList(pickMoviesArray)
                })
                .catch(() => {});
            }
        });
    }, [id])

    return (
        <div className={styles.contentWrapper}>
            <LeftSideBar />
            <div className={styles.actorsWrapper}>
                <div className={styles.actorDescription}>
                    <img src={actor.imgpath} alt="Фото не найдено" className={styles.actorImg}/>
                    <ActorInfo actor={actor} />
                </div>
                <MovieListContent movies={moviesList} title="Фильмы, в которых играл актёр" />
            </div>
        </div>
    )
};

export default ActorPage;