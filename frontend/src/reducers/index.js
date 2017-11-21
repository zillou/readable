import { 
  RECEIVE_CATEGORIES, 
  RECEIVE_POSTS, 
  RECEIVE_POST, 
  RECEIVE_COMMENTS, 
  POST_CREATED, 
  POST_DELETED,
  UP_VOTED_POST,
  DOWN_VOTED_POST,
  COMMENT_CREATED,
  COMMENT_DELETED,
  UP_VOTED_COMMENT,
  DOWN_VOTED_COMMENT,
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
    case UP_VOTED_POST:
      return state.map((post) => {
        if (post.id !== action.postID) {
          return post
        }

        return {
          ...post,
          voteScore: post.voteScore + 1
        }
      })
    case DOWN_VOTED_POST:
      return state.map((post) => {
        if (post.id !== action.postID) {
          return post
        }

        return {
          ...post,
          voteScore: post.voteScore - 1
        }
      })
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
    case UP_VOTED_COMMENT:
      return state.map((comment) => {
        if (comment.id !== action.commentID) {
          return comment
        }

        return {
          ...comment,
          voteScore: comment.voteScore + 1
        }
      })
    case DOWN_VOTED_COMMENT:
      return state.map((comment) => {
        if (comment.id !== action.commentID) {
          return comment
        }

        return {
          ...comment,
          voteScore: comment.voteScore - 1
        }
      })
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
