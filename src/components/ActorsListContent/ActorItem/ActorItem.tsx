import React, { useState, useEffect, FC } from "react"
import { IActor } from "../../../types/types";
import styles from "./ActorItem.module.css"
import { Link } from 'react-router-dom';

interface ActorItemProps {
    actor: IActor
}

const ActorItem: FC<ActorItemProps> = ({actor}) => {
    
    return (
        <div className={styles.actorItem}>
            <Link to={`/actor/${actor.id}`}>
                <img src={actor.imgpath} alt="Фото не найдено" />
            </Link>
        </div>
    )
};

export default ActorItem;