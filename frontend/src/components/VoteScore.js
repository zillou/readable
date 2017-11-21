import React from "react"
import { connect } from "react-redux"
import "./VoteScore.css"
import { votePost, voteComment } from "../actions"

class VoteScore extends React.Component {
  upVote() {
    if (this.props.postID) {
      this.props.dispatch(votePost(this.props.postID, 'upVote'))
    } else if (this.props.commentID) {
      this.props.dispatch(voteComment(this.props.commentID, 'upVote'))
    }
  }

  downVote() {
    if (this.props.postID) {
      this.props.dispatch(votePost(this.props.postID, 'downVote'))
    } else if (this.props.commentID) {
      this.props.dispatch(voteComment(this.props.commentID, 'downVote'))
    }
  }

  render() {
    console.log(this.props.score)
    return (
      <div className="vote">
        <button className="vote-btn vote-up" onClick={this.upVote.bind(this)}></button>
        <span className="vote-count-post ">{this.props.score}</span>
        <button className="vote-btn vote-down" onClick={this.downVote.bind(this)}></button>
      </div>
    )
  }
}

export default connect()(VoteScore)