import React from "react"
import moment from "moment"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

import { fetchPost, fetchComments, deletePost, deleteComment } from "../actions"
import  CommentForm from "./CommentForm"

import "./Comment.css"

class PostDetailView extends React.Component {
  componentWillMount() {
    const id = this.props.match.params.id
    this.props.fetchData(id)
  }

  deletePost(event) {
    event.preventDefault()
    const postID = this.props.match.params.id

    this.props.dispatch(deletePost(postID))
    this.props.history.push("/")
  }

  deleteComment(id) {
    this.props.dispatch(deleteComment(id))
  }

  renderPost() {
    const { title, author, category, timestamp, body, id } = this.props.post
    return (
      <div className="post-view">
        <h2 className="post-view-title">{title}</h2>
        <p className="post-view-meta">
          {moment(timestamp).format("LLL")} by <span>{author}</span> in <Link to={`/${category}`}>{category}</Link>
        </p>
        <div className="post-view-content">
          {body}
        </div>

        <div>
          <a onClick={this.deletePost.bind(this)} className="btn btn-danger">Delete</a>
        </div>

        <div className="comments">
          <h4>Comments ({this.props.comments.length})</h4>
          { this.renderComments() }
          <CommentForm postID={id} />
        </div>
      </div>
    )
  }

  renderComments() {
    return this.props.comments.map(comment => (
      <div key={comment.id} className="comment">
        <div className="comment-title">
          {comment.author} posted at <time>{moment(comment.timestamp).format("LLL")}</time>
          <a onClick={() => this.deleteComment(comment.id)} className="btn btn-link btn-xs">Delete</a>
          <div className="comment-info">
            <span>{comment.voteScore}</span>
          </div>
        </div>
        <div className="comment-body">{comment.body}</div>
      </div>
    ))
  }

  render() {
    return (
      <div>
        { this.props.post && this.renderPost()}
      </div>
    )
  }
}

const mapStateToProps = ({post, comments}) => ({post, comments})

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  fetchData: (id) => dispatch(fetchPost(id)).then(() => dispatch(fetchComments(id)))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView)