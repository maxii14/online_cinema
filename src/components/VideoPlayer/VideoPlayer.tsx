import React, { useState, useEffect, FC, useRef } from "react"
import { IActor, IMovie } from "../../types/types";
import VideoInfo from "./VideoInfo/VideoInfo";
import styles from "./VideoPlayer.module.css"
import ActorListContent from "../ActorsListContent/ActorsListContent";
import VideoGetData from "../VideoGetData/VideGetData.jsx";
import axios from 'axios'


interface VideoPlayerProps {
    movie: IMovie,
    actors: IActor[],
    callbackChangeIsInFavorites: (id: number, isInFavorites: boolean) => void,
}

const VideoPlayer: FC<VideoPlayerProps> = ({movie, actors, callbackChangeIsInFavorites}) => {
    
    const API_URL = "http://localhost:8082/movie/";

    const videoElement = useRef<HTMLVideoElement>(null);
    const currentTimeRef = useRef<number>();

    const [videoLink, setVideoLink] = useState("")
    const [currentTime, setCurrentTime] = useState<number>()

    useEffect(() => {
        setVideoLink(`${API_URL}` + `${movie.videopath}`);

        return () => {

            if(currentTimeRef.current === null || currentTimeRef.current === undefined)
                return;

            let date = new Date();
            let datewatched = date.getFullYear() + "-" + date.getMonth() + "-" 
            + date.getDay() + " " + date.getHours() + ":" + date.getMinutes() + ":" 
            + date.getSeconds();

            let stoppedontiming = "00:00:00";
            if(currentTimeRef.current) {
                let hours = Math.trunc(currentTimeRef.current / 3600);
                let minutes = Math.trunc((currentTimeRef.current - hours*3600) / 60);
                let seconds = Math.trunc(currentTimeRef.current - hours*3600 - minutes*60);
                stoppedontiming = hours + ":" + minutes + ":" + seconds;
            }

            var user = localStorage.getItem("userData");
            user = (user === null) ? "" : user;
            
            axios.post(`http://localhost:8081/api/v1/movies/addhistory`, 
                {
                    "userid": JSON.parse(user).id, 
                    "movieid": movie.id,
                    "datewatched": datewatched,
                    "stoppedontiming": stoppedontiming
                },
                {headers: {Authorization: JSON.parse(user).token}}
            )
            .then(response => {
                //console.log(response);
            })
            .catch(() => {});
            //console.log("Movie id: " + movie.id + "; Time: " + currentTimeRef.current)
        }
    }, [movie])

    useEffect(() => {
        currentTimeRef.current = currentTime;
    }, [currentTime])

    const handleLoadedMetadata = () => {
        
    };

    const saveCurrentTime = () => {
        if (videoElement.current) {
            setCurrentTime(videoElement.current['currentTime']);
        }
            
    }
      
    return (
        <div className={styles.videoPlayerWrapper}>
            <video controls ref={videoElement} onLoadedMetadata={handleLoadedMetadata} onTimeUpdate={saveCurrentTime}>
                <source src={videoLink} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'/>
                <p>В данном браузере невозможно запустить видео.</p>
            </video>
            
            <VideoInfo movie={movie} callbackChangeIsInFavorites={callbackChangeIsInFavorites}/>
            <div className={styles.actorListWrapper}><ActorListContent actors={actors} /></div>
            
        </div>
    )
};

export default VideoPlayer;