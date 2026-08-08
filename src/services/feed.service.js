import API from "../utils/api";


const feed = async () => {
    const response = await API.get('/api/posts/feed')
    return response.data
}

export{feed}