import React from "react"
// import { connect } from "react-redux"
import "./VoteScore.css"

export default class VoteScore extends React.Component {
  state = {
    score: parseInt(this.props.score)
  }
  render() {
    console.log(this.props.score)
    return (
      <div className="vote">
        <button className="vote-btn vote-up" onClick={()=> this.setState((state) => ({score: state.score + 1}))}></button>
        <span className="vote-count-post ">{this.state.score}</span>
        <button className="vote-btn vote-down" onClick={()=> this.setState((state) => ({score: state.score - 1}))}></button>
      </div>
    )
  }
}