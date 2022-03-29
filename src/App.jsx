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
import Loading from './components/Loading';

// Pages
import Home from './pages/Home.jsx';
import Skills from './pages/Skills.jsx';
import Contact from './pages/Contact.jsx';
import Projects from './pages/Projects.jsx';

// Assets
import _ASSETS from './assets';

function App() {
  const [timer, setTimer] = useState(0);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
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

  // onloaded
  useEffect(() => {
    // Load all assets
    Promise.all(_ASSETS.map(image => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image()
        loadImg.src = image
        // wait 2 seconds to simulate loading time
        loadImg.onload = (item) => resolve(image.url);
        loadImg.onerror = err => reject(err);
      })
    })).then(() => setAssetsLoaded(true))
      .catch(err => setAssetsLoaded(true))

    setIsShowContent(true);
  }, []);

  const showAlert = function (message = '', type = 'success', duration = 5000) {
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

  const deleteExpireAlerts = function () {

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

      { assetsLoaded ?
        <main className='min-vh-100 min-vw-100'>
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
        : <Loading assetsLoaded/>
      }

    </Router>
  );
}

export default App;
