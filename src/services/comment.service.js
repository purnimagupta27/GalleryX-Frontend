import API from "../utils/api";

const createComment = async (message, postId) => {
    const response = await API.post(`/api/comments/post/${postId}`, {message})
    return response.data
}

const getComments = async(postId) => {
    const response = await API.get(`/api/comments/${postId}`)
    return response.data
}

const deleteComment = async(commentId) => {
    const response = await API.delete(`/api/comments/${commentId}`)
    return response.data
}

export{
    createComment,
    getComments,
    deleteComment
}