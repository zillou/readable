import * as API from '../utils/Api';
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES"
export const RECEIVE_POSTS = "RECEIVE_POSTS"
export const RECEIVE_POST = "RECEIVE_POST"
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS"

export const POST_CREATED = "POST_CREATED"
export const POST_UPDATED = "POST_UPDATED"
export const POST_DELETED = "POST_DELETED"
export const COMMENT_CREATED = "COMMENT"
export const COMMENT_DELETED = "COMMENT_DELETED"

export const UP_VOTED_POST = "UP_VOTED_POST"
export const DOWN_VOTED_POST = "DOWN_VOTED_POST"

export const UP_VOTED_COMMENT = "UP_VOTED_COMMENT"
export const DOWN_VOTED_COMMENT = "DOWN_VOTED_COMMENT"

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
});

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
})

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
})

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
})

export const postUpdated = post => ({
  type: POST_UPDATED,
  post
})

export const postCreated = post => ({
  type: POST_CREATED,
  post
})

export const postDeleted = postID => ({
  type: POST_DELETED,
  postID
})

export const upVotedPost = postID =>({
  type: UP_VOTED_POST,
  postID
})

export const downVotedPost = postID =>({
  type: DOWN_VOTED_POST,
  postID
})

export const commentCreated = comment => ({
  type: COMMENT_CREATED,
  comment
})

export const commentDeleted = commentID => ({
  type: COMMENT_DELETED,
  commentID
})

export const upVotedComment = commentID =>({
  type: UP_VOTED_COMMENT,
  commentID
})

export const downVotedComment = commentID =>({
  type: DOWN_VOTED_COMMENT,
  commentID
})

export const fetchCategories = () => dispatch => (
  API.fetchCategories()
    .then(categories => dispatch(receiveCategories(categories)))
);

export const fetchPosts = (category = null) => dispatch => (
  API.fetchPosts(category)
    .then(posts => dispatch(receivePosts(posts)))
)

export const fetchPost = (id) => dispatch => (
  API.fetchPost(id)
    .then(post => post.deleted === false && dispatch(receivePost(post)))
)

export const fetchComments = (postID) => (dispatch) => (
  API.fetchComments(postID).then(comments => 
    dispatch(receiveComments(comments.filter(({deleted}) => deleted === false))))
)

export const createPost = (postParams) => (dispatch) => 
  API.createPost(postParams).then(post => dispatch(postCreated(post)))

export const updatePost = (postParams) => (dispatch) => 
  API.updatePost(postParams).then(post => dispatch(postUpdated(post)))

export const createComment = (commentParams) => (dispatch) => 
  API.createComment(commentParams).then(comment => dispatch(commentCreated(comment)))

export const deletePost = (id) => (dispatch) =>
  API.deletePost(id).then(() => dispatch(postDeleted(id)))

export const deleteComment = (id) => (dispatch) =>
  API.deleteComment(id).then(() => dispatch(commentDeleted(id)))

export const voteComment = (id, option) => (dispatch) =>
  API.voteComment(id, option).then(() => option === 'upVote' ? dispatch(upVotedComment(id)) : dispatch(downVotedComment(id)))

export const votePost = (id, option) => (dispatch) =>
  API.votePost(id, option).then(() => option === 'upVote' ? dispatch(upVotedPost(id)) : dispatch(downVotedPost(id)))