import React from "react"
import { connect } from "react-redux"

import PostForm from "./PostForm"
import { createPost } from "../actions"

const CreatePostView = (props) =>  {
  const onPostSubmit = (post) => {
    props.dispatch(createPost(post))
    props.history.push("/")
  }

  return (
    <div className="New Post">
      <PostForm onPostSubmit={onPostSubmit} />
    </div>
  )
}

export default connect()(CreatePostView)