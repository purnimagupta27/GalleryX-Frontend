import API from "../utils/api"

const followUser = async(userId) => {
    const response = await API.post(`/api/follows/${userId}`)
    return response.data
}

const getFollowStatus = async(userId) => {
    const response = await API.get(`/api/follows/${userId}`)
    return response.data
}

const unfollowUser = async(userId) => {
    const response = await API.delete(`/api/follows/${userId}`)
    return response.data
}

export{
    followUser,
    getFollowStatus,
    unfollowUser
}