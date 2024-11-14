import axios from 'axios'

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
});

// Get Method

export const getPost = () => {
    return api.get("/posts");
}

// Delete Http Request 

export const deletePost = (id) => {
    return api.delete(`/posts/${id}`)
}

// Post HTTP Request

export const addPost = (post) => {
    return api.post("/posts", post)
}


/// Put HTTP Request 

export const updateData = (id, post) => {
    return api.put(`/posts/${id}`, post)
}