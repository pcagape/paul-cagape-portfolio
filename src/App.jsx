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
        <Background />
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/skills' component={Skills} />
          <Route path='/projects' component={Projects} />
          <Route path='/contact' component={Contact} />
          <Route path='/*' component={Home}/>
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
