export interface IMovie {
    id: number;
    imgpath: string;
    name: string;
    description: string;
    genre: string;
    country: string;
    date: string;
    viewsnumber: number;
    videopath: string;
    stoppedontiming: string;
    isInFavorites: boolean;
}

export interface IActor {
    id: number;
    imgpath: string;
    name: string;
    age: number;
    country: string;
}

export interface IUser {
    id: number;
    login: string;
    activity: string;
    role: string;
    blocked: boolean;
}
