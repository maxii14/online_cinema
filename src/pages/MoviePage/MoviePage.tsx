import React, { useState, useEffect, FC } from "react"
import { IActor, IMovie } from "../../types/types";
import { useParams, useNavigate } from 'react-router-dom';
import MovieCard from "../../components/MainPageContent/MovieCard/MovieCard";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import styles from "./MoviePage.module.css"
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import axios from 'axios'

const API_URL = 'http://localhost:8081/api/v1'

interface MoviePageProps {
    movies: IMovie[],
    actors: IActor[],
    callbackChangeIsInFavorites: (id: number, isInFavorites: boolean) => void,
} 

const MoviePage:FC<MoviePageProps> = ({movies, actors, callbackChangeIsInFavorites}) => {
    
    const { id } = useParams()
    const [movie, setMovie] = useState<IMovie>()
    const [actorsList, setActorsList] = useState<IActor[]>([])
    const nav = useNavigate();

    useEffect(() => {
        var userData = localStorage.getItem('userData');
        if(userData === null) {
            nav('/signin'); 
        }
        if(!id || movies.length == 0) return;

        movies.forEach(m => {
            if (m.id.toString() == id && userData !== null) 
            {
                setMovie(m);

                //Получаем актёров, участвующих в фильме
                axios.get(`${API_URL}/movies/${m.id}/actors`, {headers : {Authorization : JSON.parse(userData).token}})
                .then(response => {
                    const pickActorsArray: IActor[] = []
                    actors.forEach(a => {
                        if(response.data.includes(a.id))
                        {
                            pickActorsArray.push(a)
                        }                    
                    });
                    setActorsList(pickActorsArray)
                })
                .catch(() => {});
            }
        });


    }, [id])


    return (
        <div className={styles.contentWrapper}>
            <LeftSideBar />
            {(movie != null) ? 
                (<VideoPlayer movie={movie} actors={actorsList} callbackChangeIsInFavorites={callbackChangeIsInFavorites}/>) 
                : (<div></div>)
            }
            
        </div>
    )
};

export default MoviePage;