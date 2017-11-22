import React from "react"
import moment from "moment"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

import { fetchPost, updatePost, fetchComments, deletePost, deleteComment } from "../actions"
import  CommentForm from "./CommentForm"
import VoteScore from "./VoteScore"
import PostForm from "./PostForm"

import "./Comment.css"

class PostDetailView extends React.Component {
  state = {
    isEditing: false
  }

  componentDidMount() {
    const id = this.props.match.params.post_id
    this.props.fetchData(id)
  }

  deletePost(event) {
    event.preventDefault()
    const postID = this.props.match.params.post_id

    this.props.dispatch(deletePost(postID)).then(() => this.props.history.push("/"))
  }

  editPost(event) {
    event.preventDefault()
    this.setState({isEditing: true})
  }

  deleteComment(id) {
    this.props.dispatch(deleteComment(id))
  }

  onPostSubmit(post) {
    this.props.dispatch(updatePost(post))
    this.setState({isEditing: false})
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
          <button onClick={this.editPost.bind(this)} className="btn btn-light">Edit</button>
          <button onClick={this.deletePost.bind(this)} className="btn btn-link">Delete</button>
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
          <div className="float-left">
            <VoteScore score={comment.voteScore} commentID={comment.id} />
          </div>
        </div>
        <div className="comment-body">{comment.body}</div>
      </div>
    ))
  }

  render() {
    return (
      <div>
        { this.state.isEditing
          ? <PostForm {...this.props.post} onPostSubmit={this.onPostSubmit.bind(this)} />
          : this.props.post && this.renderPost() 
        }
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
