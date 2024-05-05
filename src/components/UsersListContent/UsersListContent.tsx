import React, { useState, useEffect, FC } from "react";
import {IUser} from "../../types/types";
import styles from "./UsersListContent.module.css";
import axios from "axios";

interface UsersListContentProps {
    
}

const UsersListContent: FC<UsersListContentProps> = () => {
    
    const API_URL = 'http://localhost:8081/api/v1'
    const userData = localStorage.getItem('userData');

    const [users, setUsers] = useState<IUser[]>([])
    const [isBlocked, setIsBlocked] = useState<string>("");

    useEffect(() => {
        if (userData !== null) {
            axios.get(`${API_URL}/users`, {headers : {Authorization: JSON.parse(userData).token}})
            .then(response => {
                setUsers(response.data);
            })
            .catch(() => {});
        }
    }, [])

    const blockUnblockUserHandler = (e: any) => {
        const userId = e.target.id.split('/')[0];
        const isBlocked = e.target.id.split('/')[1];
        
        if (userId !== "" && isBlocked !== "" && userData !== null) {
            axios.put(`${API_URL}/users/update`, 
            {
                "userId": userId, 
                "isBlocked": (isBlocked == "true") ? "false" : "true"
            },
            {headers : {Authorization : JSON.parse(userData).token}})
            .then(response => {
                console.log(response);
                var newArr = users;
                for (var i = 0; i < users.length; i++) {
                    if (users[i].id == userId) {
                        newArr[i].blocked = (isBlocked === true) ? false : true;
                        setUsers(newArr.concat());
                        break;
                    }
                }
            })
            .catch();
        }
        else {
            console.log("Не удалось отправить запрос")
        }
    }

    return (
        <div className={styles.contentWrapper}>
           {users.map(u => 
                <div key={u.id} id={u.id + "/" + u.blocked} className={styles.userBlock} onClick={blockUnblockUserHandler}>
                    <span>{u.id}</span>
                    <span>{u.login}</span>
                    <span>{u.role}</span>
                    <span>{(u.blocked) ? "Заблокирован" : "Не заблокирован"}</span>
                    <span>{u.activity}</span>
                </div>
           )}
           <span>Нажмите на пользователя, чтобы заблокировать или разблокировать его.</span>
        </div>
    )
};

export default UsersListContent;