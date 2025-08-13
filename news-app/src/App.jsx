import './App.css'
import React, { Component } from 'react'
import Navbar from './Component/Navbar'
import News from './Component/News'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<News pageSize={6} country="us" category="science"/>} />
          </Routes>
        </Router>
      </div>
    )
  }
}