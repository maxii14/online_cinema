import React, { useState, useEffect, useRef, FC } from "react"
import { IActor, IMovie } from "../../types/types";
import { useParams, useNavigate } from 'react-router-dom';
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import styles from "./EditMoviePage.module.css"
import axios from 'axios'

const API_URL = 'http://localhost:8081/api/v1'

interface EditMoviePageProps {
    movies: IMovie[],
} 

const EditMoviePage:FC<EditMoviePageProps> = ({movies}) => {
    
    const { id } = useParams()
    const [movie, setMovie] = useState<IMovie>()

    const nameTextArea = useRef<HTMLTextAreaElement>(null);
    const genreSelect = useRef<HTMLSelectElement>(null);
    const descriptionTextArea = useRef<HTMLTextAreaElement>(null);
    const dateTextArea = useRef<HTMLTextAreaElement>(null);
    const imgPathTextArea = useRef<HTMLTextAreaElement>(null);
    const videoPathTextArea = useRef<HTMLTextAreaElement>(null);
    const countryTextArea = useRef<HTMLTextAreaElement>(null);

    const nav = useNavigate();

    var userData = localStorage.getItem('userData');
    useEffect(() => {
        if(userData === null) {
            nav('/signin'); 
        }
        if(userData !== null && JSON.parse(userData).role !== 'ADMIN') {
            nav('/');
        }
        if(!id || movies.length == 0) return;

        movies.forEach(m => {
            if (m.id.toString() == id && userData !== null) 
            {
                setMovie(m);
            }
        });


    }, [id])

    const makeChangesHandler = () => {
        if (userData !== null && movie !== undefined) {
            axios.put(`${API_URL}/movies/update`, 
            {
                "id": String(movie.id), 
                "name": nameTextArea.current!.value,
                "genre": genreSelect.current!.value,
                "description": descriptionTextArea.current!.value,
                "date": String(dateTextArea.current!.value),
                "imgpath": imgPathTextArea.current!.value,
                "videopath": videoPathTextArea.current!.value,
                "country": countryTextArea.current!.value
            },
            {headers : {Authorization : JSON.parse(userData).token}})
            .then(response => {console.log(response)})
            .catch();
            nav('/settings');
        }
        else {
            alert("Произошла ошибка. Не удалось отредактировать фильм.");
        }
    }

    const undoChangesHandler = () => {
        nav('/settings');
    }

    const deleteMovieHandler = () => {
        if (userData !== null && movie !== undefined) {
            console.log(movie.id)
            axios.delete(`${API_URL}/movies/delete`, {
                headers : {Authorization : JSON.parse(userData).token},
                data: {
                    "movieid": movie.id
                }
            })
            .then(response => {console.log(response)})
            .catch();

            nav('/settings');
        }
        else {
            alert("Произошла ошибка. Не удалось удалить фильм.");
        }
    }


    return (
        <div className={styles.contentWrapper}>
            <LeftSideBar />
            {(movie !== undefined) 
            ? <div className={styles.content}>
                <div className={styles.editFields}>
                    <span>Название</span><textarea ref={nameTextArea} rows={1} defaultValue={movie.name} />
                    <span>Жанр</span>
                    <select ref={genreSelect} defaultValue={movie.genre}>
                        <option>Комедия</option>
                        <option>Драма</option>
                        <option>Фантастика</option>
                        <option>Ужасы</option>
                        <option>Мультфильм</option>
                        <option>Боевик</option>
                        <option>Триллер</option>
                        <option>Детектив</option>
                    </select>
                    <span>Описание</span><textarea ref={descriptionTextArea} rows={13} cols={40} defaultValue={movie.description} />
                    <span>Дата выпуска</span><textarea ref={dateTextArea} rows={1} defaultValue={movie.date} />
                    <span>Страна</span><textarea ref={countryTextArea} rows={1} defaultValue={movie.country} />
                    <span>Ссылка на превью-фото</span><textarea ref={imgPathTextArea} rows={3} defaultValue={movie.imgpath}/>
                    <span>Тег видео</span><textarea ref={videoPathTextArea} rows={1} defaultValue={movie.videopath}/>

                    <div className={styles.buttonsWrapper}>
                        <button onClick={makeChangesHandler} className={styles.buttonsSave}>Сохранить</button>
                        <button onClick={undoChangesHandler}>Отменить изменения и вернуться</button>
                        <button onClick={deleteMovieHandler} className={styles.buttonsDelete}>Удалить фильм</button>
                    </div>
                </div>
            </div> 
            : <></>}
            
            
        </div>
    )
};

export default EditMoviePage;