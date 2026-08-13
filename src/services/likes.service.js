import API from "../utils/api"

const likePost = async(postId) => {
    const response = await API.post(`/api/likes/post/${postId}`)
    return response.data
}

const unlikePost = async(likeId) => {
    const response = await API.delete(`/api/likes/${likeId}`)
    return response.data
}

export {
    likePost,
    unlikePost
}