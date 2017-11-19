import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"

import { fetchCategories } from '../actions'

class Sidebar extends Component {
  componentDidMount() {
    this.props.fetchData()
  }

  render () {
    return (
      <aside className="sidebar">
        <div className="sidebar-module">
          <h4>Categories</h4>
          <ol className="list-unstyled">
            {this.props.categories && this.props.categories.length > 0 && this.props.categories.map(category =>
              <li key={category.path}>
                <Link to={`/${category.path}`}>{category.name}</Link>
              </li>
            )}
          </ol>
        </div>
      </aside>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      fetchData: () => dispatch(fetchCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
