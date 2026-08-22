import API from "../utils/api";

const createPost = async (formData) => {
  const response = await API.post("/api/posts/create-post", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const getPostById = async (postId) => {
  const response = await API.get(`/api/posts/post/${postId}`)
  return response.data
}

const deleteMyPostById = async(postId) => {
  const response = await API.delete(`/api/posts/my-post/${postId}`)
  return response.data
}

const editMyPostById = async(postId, data) => {
  const response = await API.patch(`/api/posts/my-post/${postId}`, data)
  return response.data
}



export {
  createPost,
  getPostById,
  deleteMyPostById,
  editMyPostById
};
