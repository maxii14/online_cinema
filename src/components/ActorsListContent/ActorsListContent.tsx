import React, { useState, useEffect, FC } from "react"
import styles from "./ActorsListContent.module.css"
import { IActor } from "../../types/types";
import ActorItem from "./ActorItem/ActorItem";
import { useNavigate } from 'react-router-dom';

interface ActorListContentProps {
    actors: IActor[]
}

const ActorListContent: FC<ActorListContentProps> = ({actors}) => {
    
    const nav = useNavigate();

    useEffect(() => {
        var userData = localStorage.getItem('userData');
        if(userData === null) {
            nav('/signin'); 
        }
    })

    return (
        <div className={styles.actorsListContent}>
           {actors.length ? <span className={styles.title}>Актёры</span> : <p>Не удалось получить информацию об актёрах.</p>}
           <div className={styles.actorsList}>
                {actors.length ? actors.map(actor => (
                    <ActorItem
                        key={actor.id}
                        actor={actor}
                    />
                )) : <></>}
            </div>
        </div>
    )
};

export default ActorListContent;