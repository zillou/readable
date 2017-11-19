const API_ROOT = "http://localhost:3001"
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)
const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Authorization": token
}

export const fetchCategories = () =>
  fetch(`${API_ROOT}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const fetchPosts = (category = null) => {
  const url = category ? `${API_ROOT}/${category}/posts` : `${API_ROOT}/posts`

  return fetch(url, { headers })
    .then(res => res.json())
    .then(data => data)
}

export const fetchPost = (id) => {
  return fetch(`${API_ROOT}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data)
}

export const fetchComments = (postID) => {
  return fetch(`${API_ROOT}/posts/${postID}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)
}

export const createPost = data => {
  const body = JSON.stringify(data)

  console.log(body)
  return fetch(`${API_ROOT}/posts`, { 
    method: 'POST',
    headers,
    body
  }).then(data => data.json())
}

export const deletePost = (id) => 
  fetch(`${API_ROOT}/posts/${id}`, {
    method: "DELETE",
    headers
  })

export const createComment = (data) => {
  return fetch(`${API_ROOT}/comments`, { 
    method: 'POST',
    body: JSON.stringify(data),
    headers
  }).then(data => data.json())
}

export const deleteComment = (id) => 
  fetch(`${API_ROOT}/comments/${id}`, {
    method: "DELETE",
    headers
  })