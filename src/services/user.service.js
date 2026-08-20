import API from "../utils/api"

const getUserProfile = async(userId) => {
    const response = await API.get(`/api/user/${userId}`)
    return response.data
}

export{
    getUserProfile
}