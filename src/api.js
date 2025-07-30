import axios from "axios";

export const getUsers = () => axios.get('/api/users')

export const login = async (data) => {
    const res = await axios.post('/api/login', data)
}
