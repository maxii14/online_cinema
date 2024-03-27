import React, { useState, useRef, useEffect, FC } from "react"
import { IMovie } from "../../../types/types";
import styles from "./VideoInfo.module.css"
import axios from 'axios'
import RemoveFromFavorites from '@mui/icons-material/StarBorder';
import AddInFavorites from '@mui/icons-material/Star';
import { ButtonBaseActions } from "@mui/material";

const API_URL = 'http://localhost:8081/api/v1'

interface VideoInfoComponent {
    movie: IMovie,
    callbackChangeIsInFavorites: (id: number, isInFavorites: boolean) => void,
}

const VideoInfo: FC<VideoInfoComponent> = ({movie, callbackChangeIsInFavorites}) => {

    const addInFavRef = useRef<HTMLButtonElement>(null);
    const removeFromFavRef = useRef<HTMLButtonElement>(null);


    useEffect(() => {
        if(movie["isInFavorites"] == true) {
            addInFavRef.current!.hidden = true; 
            removeFromFavRef.current!.hidden = false; 
        }
        else {
            addInFavRef.current!.hidden = false; 
            removeFromFavRef.current!.hidden = true;
        }
    }, [movie]);

    const addToFavorites = () => {
        addInFavRef.current!.hidden = true; 
        removeFromFavRef.current!.hidden = false;

        callbackChangeIsInFavorites(movie.id, true);
        // var user = localStorage.getItem("userData");
        // user = (user === null) ? "" : user;
        
        // axios.post(`${API_URL}/movies/addfavorites`, 
        //     {"userid": JSON.parse(user).id, "movieid": movie.id},
        //     {headers: {Authorization: JSON.parse(user).token}}
        // )
        //     .then(response => {console.log(response)})
        //     .catch(() => {});
    }

    const removeFromFavorites = () => {
        addInFavRef.current!.hidden = false; 
        removeFromFavRef.current!.hidden = true;

        callbackChangeIsInFavorites(movie.id, false);
        // delete logic

    }
    
    return (

        <div className={styles.videoInfoWrapper}>
           <p className={styles.movieName}>{movie.name}</p>

           <div className="buttonsSection">
                <button ref={addInFavRef} onClick={addToFavorites}><AddInFavorites id="add-in-favorites-star"/></button>
                <button ref={removeFromFavRef} onClick={removeFromFavorites}><RemoveFromFavorites id="remove-from-favorites-star"/></button>
           </div>
           
           <p className={styles.desc_item}><span>Описание:</span> {movie.description}</p>
           <p className={styles.desc_item}><span>Жанр:</span> {movie.genre}</p>
           <p className={styles.desc_item}><span>Дата выхода:</span> {movie.date}</p>
           <p className={styles.desc_item}><span>Страна:</span> {movie.country}</p>
           <p className={styles.desc_item}><span>Количество просмотров:</span> {movie.viewsnumber}</p>
        </div>
    )
};

export default VideoInfo;