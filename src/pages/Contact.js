import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import Footer from '../components/Footer';
import { TextArea } from 'react-router-dom';
import './Home.css';


function Contact () {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <div className='app-window'>
      <div className={'app-content dev-bio' + (show ?  ' window-show' : ' window-hide')}>
        <form className='contact-form' action="mailto:paul.cagape@gmail.com"
            method="POST"
            name="EmailForm">
          <label>Name</label>
          <input type="text" id="fname" name="firstname" placeholder="Your name.."/>
          <label>Subject</label>
          <textarea>
            Hello there, this is some text in a text area
          </textarea>

          <input type="submit" value="Submit"/>
        </form>
        <Footer/>
      </div>
    </div>
    
  );
}

export default Contact;