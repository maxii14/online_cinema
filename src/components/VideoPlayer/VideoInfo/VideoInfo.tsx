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

        var user = localStorage.getItem("userData");
        user = (user === null) ? "" : user;
        
        axios.post(`${API_URL}/movies/addfavorites`, 
            {
                "userid": JSON.parse(user).id, 
                "movieid": movie.id
            },
            {headers: {Authorization: JSON.parse(user).token}}
        )
        .then(response => {
            //console.log(response);
            addInFavRef.current!.hidden = true; 
            removeFromFavRef.current!.hidden = false;
            callbackChangeIsInFavorites(movie.id, true);
        })
        .catch(() => {});
    }

    const removeFromFavorites = () => {
        
        var user = localStorage.getItem("userData");
        user = (user === null) ? "" : user;

        axios.delete(`${API_URL}/movies/deletefavorite`, {
            headers: {Authorization: JSON.parse(user).token},
            data: {
                "userid": JSON.parse(user).id, 
                "movieid": movie.id
            }
        }
        ).then(response => {
            if (response.data["deleted"] == true) {
                addInFavRef.current!.hidden = false; 
                removeFromFavRef.current!.hidden = true;
                callbackChangeIsInFavorites(movie.id, false);
            }
        })
        .catch(() => {});

    }
    
    return (

        <div className={styles.videoInfoWrapper}>
           <p className={styles.movieName}>{movie.name}</p>

           <div className="buttonsSection">
                <button ref={addInFavRef} onClick={addToFavorites} title="Добавить в избранное" className={styles.add_remove_from_favorites_button}><RemoveFromFavorites /></button>
                <button ref={removeFromFavRef} onClick={removeFromFavorites} title="Убрать из избранного" className={styles.add_remove_from_favorites_button}><AddInFavorites /></button>
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