import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';


function Home () {
  const [show, setShow] = useState(false);
  const history = useHistory();

  const goToContact = () => {
    history.push('/contact');
    // console.log();
    // useNavigate('/contact');
  }

  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <div className='app-window'>
      <div className={'app-content dev-bio' + (show ?  ' window-show' : ' window-hide')}>
        <div className='dev-upper'>
          <div className='dev-name-prof'>
            <h1 className='dev-name'>Paul Angielo Cagape</h1>
            <p className='dev-prof'>Web & Game Developer</p>
          </div>
          <img className='dev-pic' src='../images/profile.jpg' alt=''/>
        </div>
        <div className='dev-lower'>
          <p className='dev-msg dev-msg-hi'>
            Hi there, Welcome!
          </p>
          <p className='dev-msg'>I'm a web developer and in the same time a game developer. You can check some of my works on the{' '}
            <Link to='/projects'>
              Projects
            </Link> page or you can just contact me if you want a word with me. Anyways, just take your time to look around my page.
          </p>
          <div className='buttons'>
            <Button onClick={goToContact}>Contact Me</Button>
            <Button>Download CV</Button>
          </div>
          <p className='dev-msg'>
            Thank you for visiting!
          </p>
        </div>
      </div>
    </div>
    
  );
}

export default Home