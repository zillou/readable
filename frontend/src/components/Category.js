import React from "react"
import { connect } from "react-redux"

import { fetchPosts } from "../actions"
import PostList from "./PostList"

class PostView extends React.Component {
  componentDidMount() {
    const category = this.props.match.params.category
    this.props.fetchData(category)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.category !== this.props.match.params.category) {
      const category = nextProps.match.params.category
      this.props.fetchData(category)
    }
  }

  render() {
    const { posts } = this.props
    const category = this.props.match.params.category

    return (
      <div>
        {
          posts.length
          ? <PostList posts={posts} />
          : <p>No posts in {category} yet.</p>
        }
      </div>
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
    fetchData: (category) => dispatch(fetchPosts(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)
