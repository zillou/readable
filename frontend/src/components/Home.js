import React from "react"
import { fetchPosts } from "../actions"
import { connect } from "react-redux"

import PostList from "./PostList"

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchData()
  }
  render() {
    return (
      <PostList posts={this.props.posts} />
    )
  }
}


const mapStateToProps = (state) => {
  return {
    posts: state.posts
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      fetchData: () => dispatch(fetchPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
