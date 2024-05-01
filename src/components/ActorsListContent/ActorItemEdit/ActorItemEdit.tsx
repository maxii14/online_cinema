import React, { useState, useEffect, FC } from "react"
import { IActor } from "../../../types/types";
import styles from "./ActorItemEdit.module.css"
import { Link } from 'react-router-dom';

interface ActorItemProps {
    actor: IActor
}

const ActorItem: FC<ActorItemProps> = ({actor}) => {
    
    return (
        <div className={styles.actorItemEdit} title={actor.name}>
            <Link to={`/editactor/${actor.id}`}>
                <img src={actor.imgpath} alt="Фото не найдено" />
            </Link>
        </div>
    )
};

export default ActorItem;