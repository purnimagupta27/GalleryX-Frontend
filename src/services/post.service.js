import API from "../utils/api";

const createPost = async (formData) => {
  const response = await API.post("/api/posts/create-post", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export { createPost };
