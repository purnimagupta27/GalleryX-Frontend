import API from "../utils/api";

const register = async (data) => {
    const response = await API.post('/api/auth/signup', data)
    return response.data
}

const login = async (data) => {
    const response = await API.post('/api/auth/signin', data)
    return response.data
}

const getMe = async () => {
    const response = await API.get('/api/auth/me')
    return response.data
}



export {
    register,
    login,
    getMe
}

