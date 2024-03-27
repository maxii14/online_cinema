import React, { useState, useEffect, FC } from "react"
import { Link } from 'react-router-dom';
import sideBarStyles from "../LeftSideBar.module.css"
import ComedyIcon from '@mui/icons-material/InsertEmoticonOutlined';
import DramaIcon from '@mui/icons-material/Nature';
import HorrorIcon from '@mui/icons-material/ReportProblem';
import FantasyIcon from '@mui/icons-material/AutoFixHigh';
import CartoonsIcon from '@mui/icons-material/BedroomBabyOutlined';
import ActionIcon from '@mui/icons-material/LocalFireDepartment';
import TrillerIcon from '@mui/icons-material/Outlet';
import DetectiveIcon from '@mui/icons-material/Key';;

const GenresSection:FC = () => {
    
    return (
        <div className={sideBarStyles.section}>
           <span className={sideBarStyles.sectionTitle}>Жанры</span>
           <ul>
                <Link to='/movies/comedy'>
                    <li>
                        <ComedyIcon />
                        Комедия
                    </li>
                </Link>

                <Link to='/movies/drama'>
                    <li>
                        <DramaIcon />
                        Драма
                    </li>
                </Link>

                <Link to='/movies/fantasy'>
                    <li>
                        <FantasyIcon />
                        Фантастика
                    </li>
                </Link>

                <Link to='/movies/horror'>
                    <li>
                        <HorrorIcon />
                        Ужасы
                    </li>
                </Link>
                
                <Link to='/movies/cartoons'>
                    <li>
                        <CartoonsIcon />
                        Мультфильмы
                    </li>
                </Link>

                <Link to='/movies/action'>
                    <li>
                        <ActionIcon />
                        Боевик
                    </li>
                </Link>

                <Link to='/movies/triller'>
                    <li>
                        <TrillerIcon />
                        Триллер
                    </li>
                </Link>

                <Link to='/movies/detective'>
                    <li>
                        <DetectiveIcon />
                        Детектив
                    </li>
                </Link>
           </ul>
        </div>
    )
};

export default GenresSection;