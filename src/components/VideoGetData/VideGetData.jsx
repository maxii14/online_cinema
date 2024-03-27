import React, { useState, useEffect, FC, useRef, LegacyRef } from "react"
//import ffmpeg from "fluent-ffmpeg"

function VideoGetData({src}) {

    const videoRef = useRef()
    

    //const ffmpeg = require('fluent-ffmpeg');
    
    

    useEffect(() => {
        //videoRef.current = document.getElementById("videoEl");
        //console.log(videoRef.current.duration)
        
    }, [])

    
    
    function cut() {
        
    }
    //const ffmpeg = require('fluent-ffmpeg');
    //ffmpeg.setFfmpegPath(ffmpegPath);
    //const ffmpeg = FFmpeg.createFFmpeg({log: true})
    

    const getTiming = () => {
        console.log(videoRef.current.currentTime)
    }    

    return(
        <div>
            <video controls id="videoEl" ref={videoRef}>
                <source src={src}
                        type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'/>   
            </video>
            <button onClick={getTiming}>Get timing</button>
        </div>
    )

}

export default VideoGetData;