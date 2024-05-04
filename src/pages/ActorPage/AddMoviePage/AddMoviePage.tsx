import React, { useState, useEffect, useRef, FC } from "react"
import { IActor } from "../../../types/types";
import { useParams, useNavigate } from 'react-router-dom';
import LeftSideBar from "../../../components/LeftSideBar/LeftSideBar";
import styles from "./AddMoviePage.module.css"
import axios from 'axios'

const API_URL = 'http://localhost:8081/api/v1'

interface AddMoviePageProps {
    actors: IActor[]
} 

const AddMoviePage:FC<AddMoviePageProps> = ({actors}) => {

    const nameTextArea = useRef<HTMLTextAreaElement>(null);
    const genreSelect = useRef<HTMLSelectElement>(null);
    const descriptionTextArea = useRef<HTMLTextAreaElement>(null);
    const dateTextArea = useRef<HTMLTextAreaElement>(null);
    const imgPathTextArea = useRef<HTMLTextAreaElement>(null);
    const videoPathTextArea = useRef<HTMLTextAreaElement>(null);
    const countryTextArea = useRef<HTMLTextAreaElement>(null);
    const actorSelect = useRef<HTMLSelectElement>(null);

    const[actorsToAddId, setActorsToAddId] = useState<number[]>([])

    const nav = useNavigate();

    var userData = localStorage.getItem('userData');
    useEffect(() => {
        if(userData === null) {
            nav('/signin'); 
        }
        if(userData !== null && JSON.parse(userData).role !== 'ADMIN') {
            nav('/');
        }

    }, [actors])

    const addMovieHandler = () => {

        if (userData !== null) {
            axios.post(`${API_URL}/movies/addmovie`, 
            {
                "imgpath": imgPathTextArea.current!.value, 
                "name": nameTextArea.current!.value,
                "description": descriptionTextArea.current!.value,
                "genre": genreSelect.current!.value,
                "country": countryTextArea.current!.value,
                "date": dateTextArea.current!.value,
                "videopath": videoPathTextArea.current!.value
            },
            {headers: {Authorization: JSON.parse(userData).token}}
            )
            .then(response => {
                //Добавляем выбранных актёров к фильму
                actorsToAddId.forEach(id => {
                    if(userData !== null)
                        axios.post(`${API_URL}/movies/addactor`, 
                        {
                            "movieid" : response["data"]["id"],
                            "actorid": id
                        },
                        {headers: {Authorization: JSON.parse(userData).token}}
                        )
                        .then(response => {
  
                        })
                })
                nav('/settings');
            })
            .catch(() => {alert("Произошла ошибка. Не удалось добавить фильм.");});
        }
    }

    const onSelectActor = (e: any) => {
        var actorId = -1;
        actors.forEach(a => {
            if (a.name === e.target.value) {
                actorId = a.id;
            }
        })

        if (!actorsToAddId.includes(actorId)) {
            setActorsToAddId(actorsToAddId.concat(actorId));
        }
    }

    const removeActorHandler = (e: any) => {
        const id = e.target.value.split('/')[0];

        for (var i = 0; i < actorsToAddId.length; i++) {
            if (actorsToAddId[i] == id) {
                actorsToAddId.splice(i, 1);
                setActorsToAddId(actorsToAddId.concat());
                break;
            }
        }

    }

    const undoChangesHandler = () => {
        nav('/settings');
    }


    return (
        <div className={styles.contentWrapper}>
            <LeftSideBar />
            <div className={styles.content}>
                <div className={styles.editFields}>
                    <span>Название</span><textarea ref={nameTextArea} rows={1} />
                    <span>Жанр</span>
                    <select ref={genreSelect} >
                        <option>Комедия</option>
                        <option>Драма</option>
                        <option>Фантастика</option>
                        <option>Ужасы</option>
                        <option>Мультфильм</option>
                        <option>Боевик</option>
                        <option>Триллер</option>
                        <option>Детектив</option>
                    </select>
                    <span>Описание</span><textarea ref={descriptionTextArea} rows={13} cols={40} />
                    <span>Дата выпуска</span><textarea ref={dateTextArea} rows={1} />
                    <span>Страна</span><textarea ref={countryTextArea} rows={1} />
                    <span>Ссылка на превью-фото</span><textarea ref={imgPathTextArea} rows={3} />
                    <span>Тег видео</span><textarea ref={videoPathTextArea} rows={1} />
                    <span>Выберите актёра</span>
                    <select ref={actorSelect} onChange={onSelectActor}>
                        {actors.length && actors.map(a => <option key={a.id}>{a.name}</option>)}
                    </select>
                    <div className={styles.actorsToAddWrapper}>
                        {actors.map(a => 
                            actorsToAddId.includes(a.id) ?
                            <div key={a.id} className={styles.actorsToAdd}>
                                <span>{a.name}</span>
                                <button value={a.id} className={styles.removeActor} onClick={removeActorHandler}>X</button>
                            </div>
                            : <></>
                        )}
                    </div>

                    <div className={styles.buttonsWrapper}>
                        <button onClick={addMovieHandler} className={styles.buttonsAdd}>Добавить фильм</button>
                        <button onClick={undoChangesHandler}>Вернуться в настройки</button>
                    </div>
                </div>
            </div> 
            
        </div>
    )
};

export default AddMoviePage;