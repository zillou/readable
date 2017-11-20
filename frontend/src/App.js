import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from "react-router-dom"

import Home from "./components/Home"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Category from "./components/Category"
import About from "./components/About"
import PostDetailView from "./components/PostDetailView"
import PostForm from "./components/PostForm"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <main className="container">
            <div className="row">
              <div className="col-md-9">
                <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route path="/about/" component={About} />
                  <Route path="/posts/new" component={PostForm} />
                  <Route exact path="/:category" component={Category}/>
                  <Route exact path="/:category/:post_id" component={PostDetailView} />
                </Switch>
              </div>
              <div className="col-md-3">
                <Sidebar />
              </div>
            </div>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
