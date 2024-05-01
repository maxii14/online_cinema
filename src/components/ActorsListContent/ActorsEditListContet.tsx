import React, { useState, useEffect, FC } from "react"
import styles from "./ActorsEditListContent.module.css"
import { IActor } from "../../types/types";
import ActorItemEdit from "./ActorItemEdit/ActorItemEdit";
import { useNavigate } from 'react-router-dom';

interface ActorEditListContentProps {
    actors: IActor[]
}

const ActorListContent: FC<ActorEditListContentProps> = ({actors}) => {

    return (
        <div className={styles.actorsEditListContent}>
           <div className={styles.actorsEditList}>
                {actors.length ? actors.map(actor => (
                    <ActorItemEdit
                        key={actor.id}
                        actor={actor}
                    />
                )) : <></>}
            </div>
        </div>
    )
};

export default ActorListContent;