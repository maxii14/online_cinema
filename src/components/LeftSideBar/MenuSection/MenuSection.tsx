import React, { useState, useEffect, FC } from "react"
import { Link } from 'react-router-dom';
import sideBarStyles from "../LeftSideBar.module.css"
import HomeIcon from '@mui/icons-material/HomeOutlined';
import FindNewIcon from '@mui/icons-material/SavedSearch';
import ActorsIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';

const MenuSection:FC = () => {
    
    return (
        <div className={sideBarStyles.section}>
           <span className={sideBarStyles.sectionTitle}>Меню</span>
           <ul>
                <Link to='/'>
                    <li>
                        <HomeIcon />
                        Главная страница
                    </li>
                </Link>

                <Link to='/movies/new'>
                    <li>
                        <FindNewIcon />
                        Новинки
                    </li>
                </Link>

                <Link to='/actors'>
                    <li>
                        <ActorsIcon />
                        Актёры
                    </li>
                </Link>

                <Link to='/search'>
                    <li>
                        <SearchIcon />
                        Поиск
                    </li>
                </Link>
           </ul>
        </div>
    )
};

export default MenuSection;