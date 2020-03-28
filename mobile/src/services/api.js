import axios from 'axios'

const api = axios.create(
    {
        baseURL: 'http://192.168.169.102:3333'
    }
)

export default api