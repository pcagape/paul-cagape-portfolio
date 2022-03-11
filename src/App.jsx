import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Background from './components/Background';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home.jsx';
import Skills from './pages/Skills.jsx';
import Contact from './pages/Contact.jsx';
import Projects from './pages/Projects.jsx';

function App() {
  return (
    <div className='main-app'>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/*' exact component={AppBody}/>
        </Switch>
        <Footer/>
        <Background />
      </Router>
    </div>
  );
}

function AppBody() {
  return (
      <div className='app-body'>
        <Home />
        <Skills />
        <Contact />
        <Projects />
      </div>
  )
}


export default App;
