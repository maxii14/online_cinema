import React, { useState, useEffect, FC } from "react"
import MenuSection from "./MenuSection/MenuSection";
import GenresSection from "./GenresSection/GenresSection";
import GeneralSection from "./GeneralSection/GeneralSection";
import styles from './LeftSideBar.module.css'

interface SideBarProps {
    
}

const SideBar:FC<SideBarProps> = () => {
    
    return (
        <div className={styles.leftSideBar}>
           <MenuSection />
           <GenresSection />
           <GeneralSection />
        </div>
    )
};

export default SideBar;