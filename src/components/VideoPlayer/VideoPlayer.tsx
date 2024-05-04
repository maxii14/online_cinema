import React, { useState, useEffect, FC, useRef, LegacyRef } from "react"
import { IActor, IMovie } from "../../types/types";
import VideoInfo from "./VideoInfo/VideoInfo";
import styles from "./VideoPlayer.module.css"
import ActorListContent from "../ActorsListContent/ActorsListContent";
import VideoGetData from "../VideoGetData/VideGetData.jsx";


interface VideoPlayerProps {
    movie: IMovie,
    actors: IActor[],
    callbackChangeIsInFavorites: (id: number, isInFavorites: boolean) => void,
}

const VideoPlayer: FC<VideoPlayerProps> = ({movie, actors, callbackChangeIsInFavorites}) => {
    
    const API_URL = "http://localhost:8082/movie/";

    const videoElement = useRef(null);

    const [videoLink, setVideoLink] = useState("")

    useEffect(() => {
        setVideoLink(`${API_URL}` + `${movie.videopath}`);
    }, [movie])

    const handleLoadedMetadata = () => {
        const video = videoElement.current;
        if (!video) return;
        console.log(video)
        //console.log(`The video is ${videoElement.current} seconds long.`);
      };

      /*var audio = new Audio('../../videos/Deca_Joins.mp3')
      audio.onloadedmetadata = function() {
        console.log("dsfsdf")
      }
      audio.addEventListener("loadedmetadata", (e) => {
        console.log(e)
      })*/


      
    return (
        <div className={styles.videoPlayerWrapper}>
            <video controls ref={videoElement} onLoadedMetadata={handleLoadedMetadata}>
                <source src={videoLink} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'/>
                <p>В данном браузере невозможно запустить видео.</p>
            </video>
            
            <VideoInfo movie={movie} callbackChangeIsInFavorites={callbackChangeIsInFavorites}/>
            <div className={styles.actorListWrapper}><ActorListContent actors={actors} /></div>
            
        </div>
    )
};

export default VideoPlayer;