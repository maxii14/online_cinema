import React, { useState, useEffect, FC } from "react"
import { IActor } from "../../types/types";
import styles from "./ActorInfo.module.css"


interface ActorInfoProps {
    actor: IActor
}

const ActorInfo: FC<ActorInfoProps> = ({actor}) => {
    
    return (
        <div className={styles.actorInfoWrapper}>
           <span className={styles.actorName}>{actor.name}</span>
           <span>{actor.age} лет</span>
           <span>{actor.country}</span>
        </div>
    )
};

export default ActorInfo;