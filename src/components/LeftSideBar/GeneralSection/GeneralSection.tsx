import React, { useState, useEffect, FC } from "react"
import { Link } from 'react-router-dom';
import styles from "../LeftSideBar.module.css"
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import LoginIcon from '@mui/icons-material/LoginOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';

const GeneralSection:FC = () => {
    
    return (
        <div className={styles.section}>
           <span className={styles.sectionTitle}>Общее</span>
           <ul>
                <Link to='/settings'>
                    <li>
                        <SettingsIcon />
                        Настройки
                    </li>
                </Link>

                <Link to='/signout'>
                    <li>
                        <LoginIcon />
                        Выйти
                    </li>
                </Link>
           </ul>
        </div>
    )
};

export default GeneralSection;