import React from "react"
import uuid from "uuid/v1"

class PostForm extends React.Component {
  state = {
    title: this.props.title,
    author: this.props.author,
    category: this.props.category,
    body: this.props.body
  }

  onSubmit(event) {
    event.preventDefault()

    const post = {
      id: uuid(),
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category
    }

    this.props.onPostSubmit(post)
  }

  handleInputChange(event) {
    const name = event.target.name
    const value = event.target.value

    this.setState({[name]: value})
  }

  render() {
    const { title, author, category, body } = this.state
    return (
      <div>
        <h2>Create a new post</h2>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="post-title">Title</label>
            <input type="text" className="form-control" name="title" id="post-title" 
              onChange={this.handleInputChange.bind(this)} 
              value={title} />
          </div>

          <div className="form-group">
            <label htmlFor="post-author">Author</label>
            <input type="text" className="form-control" id="post-author" name="author"
              onChange={this.handleInputChange.bind(this)} 
              value={author} />
          </div>

          <div className="form-group">
            <label htmlFor="post-category">Category</label>
            <input type="text" className="form-control" id="post-category" name="category"
              onChange={this.handleInputChange.bind(this)} 
              value={category} />
          </div>

          <div className="form-group">
            <label htmlFor="post-body">Content</label>
            <textarea className="form-control" id="post-body" rows="8" name="body"
              onChange={this.handleInputChange.bind(this)} 
              value={body} />
          </div>

          <button type="submit" className="btn btn-primary btn-block">Publish</button>
        </form>
      </div>
    )
  }
}

export default PostForm