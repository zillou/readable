import React from "react"
import { connect } from "react-redux"
import uuid from "uuid/v1"

import { createComment } from "../actions"

class CommentForm extends React.Component {
  state = {
    author: "",
    body: "",
  }

  onSubmit(event) {
    event.preventDefault()

    const comment = {
      id: uuid(),
      timestamp: Date.now(),
      parentId: this.props.postID,
      body: this.state.body,
      author: this.state.author,
    }

    this.props.dispatch(createComment(comment))
    this.setState({
      author: "",
      body: ""
    })
  }

  handleInputChange(event) {
    const name = event.target.name
    const value = event.target.value

    this.setState({[name]: value})
  }

  render() {
    const { author, body } = this.state
    return (
      <div className="comment-form" style={{marginTop: "15px"}}>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="form-group">
            <textarea className="form-control" id="comment-body" name="body"
              onChange={this.handleInputChange.bind(this)} 
              placeholder="Leave a comment"
              value={body} />
          </div>

          <div className="form-group">
            <input type="text" className="form-control" name="author" id="comment-author" 
              onChange={this.handleInputChange.bind(this)} 
              placeholder="Your name"
              value={author} />
          </div>

          <button type="submit" className="btn btn-primary btn-block">Submit</button>
        </form>
      </div>
    )
  }
}

export default connect()(CommentForm)