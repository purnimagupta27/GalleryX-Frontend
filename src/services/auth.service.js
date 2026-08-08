import API from "../utils/api";

const register = async (data) => {
    const response = await API.post('/api/auth/signup', data)
    return response.data
}

const login = async (data) => {
    const response = await API.post('/api/auth/signin', data)
    return response.data
}



export {
    register,
    login
}

