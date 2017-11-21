import React from "react"
import moment from "moment"
import { Link } from "react-router-dom"
import VoteScore from "./VoteScore"
import "./Post.css"

const Post = ({ id, title, timestamp, body, author, category, voteScore }) =>
  <div className="post">
    <div className="title">
      <Link to={`/${category}`} className="category">{category}</Link>
      <Link to={`/${category}/${id}`}>{title}</Link>

      <div className="float-left">
        <VoteScore score={voteScore} />
      </div>
    </div>
    <div className="info">
      <span>{author}</span>
      <span> Posted at {moment(timestamp).format("LLL")}</span>
    </div>
  </div>
    

export default class PostList extends React.Component {
  state = {
    sort: "voteScore"
  }

  render() {
    return (
      <div>
        <div className="btn-group" data-toggle="buttons">
          <button className="btn btn-primary btn-sm" onClick={() => this.setState({ sort: "voteScore" })}>By Vote Score</button>
          <button className="btn btn-primary btn-sm" onClick={() => this.setState({ sort: "timestamp" })}>By date</button>
        </div>

        <div className="float-right">
          <Link to="/posts/new" className="btn btn-primary btn-sm">New Post</Link>
        </div>

        <div className="clearfix posts">
          {this.props.posts.sort((a, b) => a[this.state.sort] - b[this.state.sort]).map(post => <Post key={post.id} {...post} />)}
        </div>
      </div>
    )
  }
}
