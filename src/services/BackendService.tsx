import axios from 'axios'
import { IMovie } from '../types/types'

const API_URL = 'http://localhost:8081'

class BackendService {

    getAllMovies() {
        axios.get(`${API_URL}/movies`)
            .then(response => {return response.data})
            .catch(() => {return []});
    }

    getStr() {
        return "qwe";
    }

}

export default new BackendService()