
import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
export default class App extends Component {

  state={
    progress:0
  }
  
  setProgress=(progress)=>{
    this.setState({
      progress:progress
    });
  }
  render() {
    return (
      <>
      <div>
        <Router>
          <Navbar/>
            <LoadingBar
              color='#f11946'
              height={3}
              progress={this.state.progress}
              // onLoaderFinished={() => setProgress(0)}
            />
          <Routes>
              <Route exact path="/" key="general" element={<News setProgress={this.setProgress} pageSize="12" country="in" category="general" />}></Route>
              <Route exact path="/sports" key="sports" element={<News setProgress={this.setProgress} pageSize="12" country="in" category="sports" />}></Route>
              <Route exact path="/business" key="business" element={<News setProgress={this.setProgress} pageSize="12" country="in" category="business" /> }></Route>
              <Route exact path="/entertainment" key="entertainment" element={<News setProgress={this.setProgress} pageSize="12" country="in" category="entertainment" /> }></Route>
              <Route exact path="/health" key="health" element={<News setProgress={this.setProgress} pageSize="12" country="in" category="health" />}></Route>
              <Route exact path="/science" key="science" element={<News setProgress={this.setProgress} pageSize="12" country="in" category="science" />}></Route>
              <Route exact path="/technology" key="technology" element={<News setProgress={this.setProgress} pageSize="12" country="in" category="technology" /> }></Route>
            </Routes>
          </Router>
      </div>
      </>
    )
  }
}
