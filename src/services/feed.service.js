import API from "../utils/api";


const feed = async (page = 1, limit = 5) => {
    const response = await API.get(`/api/posts/feed?page=${page}&limit=${limit}`)
    return response.data
}

const followingFeed = async (page = 1, limit = 5) => {
    const response = await API.get(`/api/posts/feed/following?page=${page}&limit=${limit}`)
    return response.data
}



export { feed, followingFeed }