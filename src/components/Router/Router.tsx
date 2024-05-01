import React, { useState, useEffect, FC } from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MoviePage from '../../pages/MoviePage/MoviePage';
import MainPage from '../../pages/MainPage/MainPage';
import { IActor, IMovie } from "../../types/types";
import axios from 'axios'
import MoviesListPage from "../../pages/MoviesListPage/MoviesListPage";
import ActorsListPage from "../../pages/ActorsListPage/ActorsListPage";
import ActorPage from "../../pages/ActorPage/ActorPage";
import SignInPage from "../../pages/SignInPage/SignInPage";
import SignUpPage from "../../pages/SignUpPage/SignUpPage";
import SettingsPage from "../../pages/SettingsPage/SettingsPage";
import EditMoviePage from "../../pages/EditMoviePage/EditMoviePage";

const API_URL = 'http://localhost:8081/api/v1'

const Router:FC = () => {
    
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [actors, setActors] = useState<IActor[]>([]);
    const [historyMovies, setHistoryMovies] = useState<IMovie[]>([]);
    const [favoritesMovies, setFavoritesMovies] = useState<IMovie[]>([]);
    const [userData, setuserData] = useState<any>("");

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        //console.log(localStorage.getItem('userData'))
        
        if (userData !== null) {

            axios.get(`${API_URL}/movies`, {headers : {Authorization : JSON.parse(userData).token}})
                .then(response => {
                    setMovies(response.data);

                    //Получаем фильмы из избранного
                    axios.get(`${API_URL}/movies/userfavorites/${JSON.parse(userData).id}`, 
                    {headers : {Authorization : JSON.parse(userData).token}})
                    .then(response1 => {
                        const arr = [];
                        const mv = response.data;
            
                        for (var i = 0; i < mv.length; i++) {
                            if (response1.data.includes(mv[i].id)){
                                mv[i]["isInFavorites"] = true;
                                arr.push(mv[i]);
                            }
                            else {
                                mv[i]["isInFavorites"] = false;
                            }
                        }
                        setFavoritesMovies(arr);
                    })
                    .catch(() => {});

                    //Получаем фильмы из истории просмотров
                    axios.get(`${API_URL}/movies/userhistory/${JSON.parse(userData).id}`, 
                    {headers : {Authorization : JSON.parse(userData).token}})
                    .then(response1 => {
                        const arr = [];
                        const mv = response.data;
            
                        for (var i = 0; i < mv.length; i++) {
                            for (var j = 0; j < response1.data.length; j++) {
                                if (response1.data[j].includes(mv[i].id)) {
                                    mv[i]["stoppedontiming"] = response1.data[j][1];
                                    arr.push(mv[i]);
                                }
                            }
                        }

                        setHistoryMovies(arr);
                    })
                    .catch(() => {});
                })
                .catch(() => {});


            axios.get(`${API_URL}/actors`, {headers : {Authorization : JSON.parse(userData).token}})
                .then(response => {
                    const actorList: IActor[] = [];

                    const currentDate = new Date();
                    for (let i = 0; i < response.data.length; i++) {
                        const birthday: string = response.data[i]["birthday"];
                        const birthdayParts: String[] = birthday.split('-');
                        var age: number = currentDate.getFullYear() - Number(birthdayParts[0]);
                        var currMonth: number = Number(String(currentDate.getMonth() + 1).padStart(2, '0'));
                        var currDay: number = Number(String(currentDate.getDate()).padStart(2, '0'));
                        if (currMonth < Number(birthdayParts[1]))
                            age--;
                        if (currMonth == Number(birthdayParts[1])
                            && currDay < Number(birthdayParts[2]))
                            age--;
                        const newActor: IActor = {
                            id: response.data[i]["id"],
                            imgpath: response.data[i]["imgpath"],
                            name: response.data[i]["name"],
                            age: age,
                            country: response.data[i]["country"]
                        };
                        actorList.push(newActor);
                    }  
                    setActors(actorList);
                }).catch(() => {});
        }

    }, [userData])

    function saveUser(data: any) {
        localStorage.setItem("userData", data);
        setuserData(data);
    }

    function callbackChangeIsInFavorites(id: number, isInFavorites: boolean) {
        const allMoviesToUpdate = movies;
        const favoritesToUpdate = favoritesMovies;
        for (var i = 0; i < allMoviesToUpdate.length; i++) {
            if (allMoviesToUpdate[i].id == id) {
                allMoviesToUpdate[i]["isInFavorites"] = isInFavorites;
                if (isInFavorites) {
                    favoritesToUpdate.splice(0, 0, allMoviesToUpdate[i]);
                }
                break;
            }
        }

        // убираем из избранного
        if (isInFavorites == false) { 
            for (var i = 0; i < favoritesToUpdate.length; i++) {
                if (favoritesToUpdate[i].id == id) {
                    favoritesToUpdate.splice(i, 1);
                    break;
                }
            }
        }
        
        setMovies(allMoviesToUpdate);
        setFavoritesMovies(favoritesToUpdate);
    }
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage movies={movies} favoritesMovies={favoritesMovies} historyMovies={historyMovies}/>} />
                <Route path='/movie/:id' element={<MoviePage movies={movies} actors={actors} callbackChangeIsInFavorites={callbackChangeIsInFavorites}/>} />
                <Route path='/actor/:id' element={<ActorPage movies={movies} actors={actors} />} />

                <Route path='/signin' element={<SignInPage type="link" callbackSaveUser={saveUser}/>} />
                <Route path='/signout' element={<SignInPage type="signout" callbackSaveUser={saveUser}/>} />
                <Route path='/signup' element={<SignUpPage />} />

                <Route path='/settings' element={<SettingsPage movies={movies} actors={actors}/>} />
                <Route path="/editmovie/:id" element={<EditMoviePage movies={movies} />} />
                <Route path="/editactor/:id" element={<p>edit actor</p>} />

                <Route path='/movies/history' element={<MoviesListPage 
                    movies={historyMovies}
                    title="История просмотров" />} />
                <Route path='/movies/favorites' element={<MoviesListPage 
                    movies={favoritesMovies}
                    title="Избранное" />} />

                <Route path='/movies/comedy' element={<MoviesListPage 
                    movies={movies.filter((movie) => movie.genre == "Комедия")}
                    title="Комедия" />} />
                <Route path='/movies/fantasy' element={<MoviesListPage 
                    movies={movies.filter((movie) => movie.genre == "Фантастика")}
                    title="Фантастика" />} />
                <Route path='/movies/horror' element={<MoviesListPage 
                    movies={movies.filter((movie) => movie.genre == "Ужасы")}
                    title="Ужасы" />} />
                <Route path='/movies/cartoons' element={<MoviesListPage 
                    movies={movies.filter((movie) => movie.genre == "Мультфильм")}
                    title="Мультфильмы"/>} />
                <Route path='/movies/action' element={<MoviesListPage 
                    movies={movies.filter((movie) => movie.genre == "Боевик")}
                    title="Боевик" />} />
                <Route path='/movies/triller' element={<MoviesListPage 
                    movies={movies.filter((movie) => movie.genre == "Триллер")}
                    title="Триллер" />} />
                <Route path='/movies/detective' element={<MoviesListPage 
                    movies={movies.filter((movie) => movie.genre == "Детектив")}
                    title="Детектив" />} />
                <Route path='/movies/drama' element={<MoviesListPage 
                    movies={movies.filter((movie) => movie.genre == "Драма")}
                    title="Драма"/>} />
                <Route path='/movies/new' element={<MoviesListPage 
                    movies={movies.filter((movie) => movie.date==((new Date()).getFullYear()-1).toString())}
                    title="Фильмы за текущий год"/>} />
                <Route path='/actors' element={<ActorsListPage actors={actors} />} />

                <Route path='*' element={<MainPage movies={movies} favoritesMovies={favoritesMovies} historyMovies={historyMovies}/>} />
            </Routes>
        </BrowserRouter>
    )
};

export default Router;