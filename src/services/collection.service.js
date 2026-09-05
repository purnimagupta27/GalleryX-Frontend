import API from "../utils/api";

const createCollection = async (data) => {
  const payload = typeof data === "string" ? { name: data } : data;
  const response = await API.post("/api/boards/create-board", payload);
  return response.data;
};

const getCollections = async () => {
  const response = await API.get(`/api/boards/my-boards`)
  return response.data
}

const deletecollection = async (boardId) => {
  const response = await API.delete(`/api/boards/${boardId}`)
  return response.data
}

const getCollectionStatus = async (postId) => {
  const response = await API.get(`/api/boards/status/${postId}`)
  return response.data
}

const saveToCollections = async (boardId, postId) => {
  const response = await API.post(`/api/boards/${boardId}/add-post/${postId}`)
  return response.data
}

const getPostsFromCollection = async (bookmarkId) => {
  const response = await API.get(`/api/boards/${bookmarkId}/posts`)
  return response.data
}

export {
  createCollection,
  getCollections,
  deletecollection,
  getCollectionStatus,
  saveToCollections,
  getPostsFromCollection
};
