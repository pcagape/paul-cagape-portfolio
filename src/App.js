import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Projects from './pages/Projects';



function App() {
  return (
    <div className='main-app'>
      <Router>
        <Navbar />
        <video src='/videos/video-bg.mp4' autoPlay loop muted />
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/contact' component={Contact} />
          <Route path='/projects' component={Projects} />
          <Route path='/*' component={Home}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
