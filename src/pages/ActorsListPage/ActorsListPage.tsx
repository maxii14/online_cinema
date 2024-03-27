import React, { useState, useEffect, FC } from "react"
import { IActor } from "../../types/types";
import styles from "./ActorsListPage.module.css"
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import ActorListContent from "../../components/ActorsListContent/ActorsListContent";

interface ActorsListPageProps {
    actors: IActor[]
}

const ActorsListPage: FC<ActorsListPageProps> = ({actors}) => {
    

    return (
        <div className={styles.contentWrapper}>
           <LeftSideBar />
           <div className={styles.actorList}><ActorListContent actors={actors} /></div>
        </div>
    )
};

export default ActorsListPage;