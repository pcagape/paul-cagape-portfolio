import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { v4 as generateRandomId } from 'uuid';

// CSS
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Components
import GameBackground from './components/GameBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Alert from './components/Alert';

// Pages
import Home from './pages/Home.jsx';
import Skills from './pages/Skills.jsx';
import Contact from './pages/Contact.jsx';
import Projects from './pages/Projects.jsx';

function App() {
  const [timer, setTimer] = useState(0);
  const [isShowContent, setIsShowContent] = useState(false);
  const [alertList, setAlertList] = useState([]);

  const routes = [
    { path: '/', name: 'Home', bi: 'bi-house-door-fill', Component: Home },
    { path: '/skills', name: 'Skills', bi: 'bi-wrench', Component: Skills },
    { path: '/projects', name: 'Projects', bi: 'bi-window-stack', Component: Projects },
    { path: '/contact', name: 'Contact', bi: 'bi-telephone-fill', Component: Contact },
  ]

  // timer
  useEffect(() => {
    setTimeout(() => {
      setTimer(state => (state + 1));
    }, 1000);

    // remove expire time
    deleteExpireAlerts();
  }, [timer]);

  // Show on first load
  useEffect(() => {
    setIsShowContent(true);
  }, []);

  function showAlert(message = '', type = 'success', duration = 5000) {
    switch (type) {
      case 'danger': case 'error':
        type = 'danger';
        break;
      default:
        type = 'success';
    }

    let identicalItem = alertList.find(item => item.message === message);
    if (identicalItem) return;

    // new alert
    let newAlert = {
      id: generateRandomId(),
      message,
      type,
      expireAt: timer + (duration / 1000)
    }

    // Add new alert and Transition IN
    alertList.push(newAlert);
    setAlertList(alertList.slice());
  }

  function deleteExpireAlerts() {

    // Find expired
    let deleteAlert = null;
    for (let i = 0; i < alertList.length; i++) {
      if (alertList[i].expireAt <= timer && !deleteAlert) {
        deleteAlert = alertList[i];
        break;
      }
    }

    if (!deleteAlert) return;

    // Delete expired one at a time
    let newAlerts = alertList.slice();
    newAlerts.splice(newAlerts.indexOf(deleteAlert), 1);
    setAlertList(alertList => (alertList = newAlerts));
  }

  return (
    <Router>

      <main className='position-absolute min-vh-100 min-vw-100'>
        <Navbar routes={routes} triggerTransition={setIsShowContent} />
        <Alert list={alertList} />

        <Switch>
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>

              <Component isShowContent={isShowContent} showAlert={showAlert} triggerTransition={setIsShowContent} />

            </Route>
          ))}
        </Switch>

        <Footer />
        <GameBackground />
      </main>

    </Router>
  );
}

export default App;
