import React from "react"
import { NavLink } from "react-router-dom"
import "./Header.css"

export default function Header () {
  return (
    <header>
      <div className="blog-masthead">
        <div className="container">
          <nav className="nav">
            <NavLink exact className="nav-link" to="/">Readable</NavLink>
            <NavLink className="nav-link" to="/about">About</NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}