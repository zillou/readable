import { 
  RECEIVE_CATEGORIES, 
  RECEIVE_POSTS, 
  RECEIVE_POST, 
  RECEIVE_COMMENTS, 
  POST_CREATED, 
  POST_DELETED,
  COMMENT_CREATED,
  COMMENT_DELETED,
} from "../actions"
import { combineReducers } from "redux"

const categories = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return action.categories
    default:
      return state;
  }
}

const posts = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.posts
    case POST_CREATED:
      return [...state, action.post]
    case POST_DELETED:
      return state.filter(({id}) => id === action.postID)
    default:
      return state
  }
}

const post = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_POST:
      return action.post
    default:
      return state
  }
}

const comments = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return action.comments
    case COMMENT_CREATED:
      return [...state, action.comment]
    case COMMENT_DELETED:
      return state.filter(({id}) => id === action.commentID)
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  post,
  comments
}) 
