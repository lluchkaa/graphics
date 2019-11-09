import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from '../routes'

import './App.scss'


const App: React.FC = () => (
  <div className="App">
    <Router>
      <Routes />
    </Router>
  </div>
)

export default App;
