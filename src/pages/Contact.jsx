import React, { useRef, useState, useEffect } from 'react';
import { Button } from '../components/Button';


function Contact () {
  const [show, setShow] = useState(false);
  const companyNameMaxLength = 50;
  const companyEmailMaxLength = 320;
  const companyMessageMaxLength = 2500;
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyMessage, setCompanyMessage] = useState('');
  const [companyNameValid, setCompanyNameValid] = useState(true);
  const [companyEmailValid, setCompanyEmailValid] = useState(true);
  const [companyMessageValid, setCompanyMessageValid] = useState(true);
  const [_isSendingEmail, set_isSendingEmail] = useState(false);

  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const messageInput = useRef(null);

  const _NEXT_EMAIL_SEND = 120; // Seconds
  const _MY_EMAIL = 'paul.cagape@gmail.com'
  // const _MY_FB = 'https://www.facebook.com/Enjiero/about_work_and_education';
  const _MY_LINKEDIN = 'https://www.linkedin.com/in/paul-angielo-cagape-03a24167';

  useEffect(() => {
    setShow(true);
  }, []);

  function sendEmail(e) {
    e.preventDefault();

    var lastSend = new Date(window.localStorage.getItem("_LAST_SEND_EMAIL"));
    var now = new Date();
    var diffSeconds = (now.getTime()/1000) - (lastSend.getTime()/1000);

    if(!validateAllInput()) return;

    if(!(diffSeconds > _NEXT_EMAIL_SEND)) return alert('You have just recently sent a message, please try again after a minute.');

    if(_isSendingEmail) return alert('Wait for awhile...');
    console.log("Sending email...");

    set_isSendingEmail(true);
    global.Email.send({
      Host: "smtp.mailtrap.io",
      Username: "f62cfe4c0c1071",
      Password: "db2f311af47fd0",
      To: _MY_EMAIL,
      From: companyEmail,
      Subject: `"${companyName}" tried to contact you!`,
      Body: companyMessage,
    })
    .then(function (message) {
      window.localStorage.setItem("_LAST_SEND_EMAIL", new Date());
      set_isSendingEmail(false);
      
      if(message === 'OK') {
        alert('Email sent successfully!.');
        console.log(message, "Email sent successfully!");
      } else {
        alert('Something went wrong! Please try again.');
        console.error(message);
      }
    });
  }

  function validateAllInput() {
    // name
    var nameValid = checkNameValid(companyName);
    // email
    var emailValid = checkEmailValid(companyEmail);
    // email
    var msgValid = checkMessageValid(companyMessage);

    if(!nameValid || !emailValid || !msgValid)
      return false;

    return true;
  }

  function checkNameValid(name) {
    name = name.trim();
    nameInput.current.value = name;

    setCompanyName(currCompanyName => currCompanyName = name);
    var isValid = true;
    if(name.trim().length < 1)
        isValid = false;

    // !/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g.test(name)

    if(!isValid) setCompanyNameValid(false);
    else setCompanyNameValid(true);

    return isValid;
  }

  function checkEmailValid(email) {
    email = email.trim();
    emailInput.current.value = email;

    setCompanyEmail(currCompanyEmail => currCompanyEmail = email);

    var isValid = true;
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      isValid = false;
    }

    if(!isValid) setCompanyEmailValid(false);
    else setCompanyEmailValid(true);

    return isValid;
  }

  function checkMessageValid(msg) {
    msg = msg.trim();
    messageInput.current.value = msg;

    setCompanyMessage(currCompanyMessage => currCompanyMessage = msg);
    var isValid = true;
    if(msg.trim().length < 10)
        isValid = false;

    if(!isValid) setCompanyMessageValid(false);
    else setCompanyMessageValid(true);

    return isValid;
  }
  
  return (
    <div className='app-window'>
      <div className={'app-content dev-bio' + (show ?  ' window-show' : ' window-hide')}>
        <div className='contact-body'>
          <form className='contact-form' onSubmit={(e) => e.preventDefault()} method="POST" name="EmailForm">
            <label>Name {companyNameValid ? '' : <i className="fas fa-exclamation-circle"> {companyName.length < 1 ? 'Please fill name!' : 'Invalid name!'}</i>}</label>
            <input type="text" id="fname" name="firstname" placeholder="Your Name/Company Name" maxLength={companyNameMaxLength} ref={nameInput} onBlur={e => checkNameValid(e.target.value.trim())}/>
            <label>Email Address {companyEmailValid ? '' : <i className="fas fa-exclamation-circle"> Invalid Address!</i>}</label>
            <input type="text" id="email" name="emailaddress" placeholder="Email Address" maxLength={companyEmailMaxLength} ref={emailInput} onBlur={e => checkEmailValid(e.target.value.trim())}/>
            <label>Message {companyMessageValid ? '' : <i className="fas fa-exclamation-circle"> Too short!</i>}</label>
            <textarea placeholder="Message..." maxLength={companyMessageMaxLength} ref={messageInput} onBlur={e => checkMessageValid(e.target.value.trim())}></textarea>
            <Button className="contact-form-submit" onClick={sendEmail} >Submit</Button>
          </form>
          <div className="contact-details">
            <label><i className='fas fa-map-marker-alt' /> General Santos City, 9500 Phillippines</label>
            <label><i className='fas fa-phone' /> (+63)9254546371</label>
            <label>
              <a className='social-icon-link facebook'
              href={'mailto:' + _MY_EMAIL}
              title='My Email Address'><i className='far fa-envelope' /> {_MY_EMAIL}</a>
              

            </label>
            {/* <label><a
              className='social-icon-link facebook'
              href={_MY_FB}
              target='_blank'
              rel="noopener noreferrer"
              title='Facebook'><i className='fab fa-facebook'/> Facebook</a></label> */}
            <label><a
              className='social-icon-link facebook'
              href={_MY_LINKEDIN}
              target='_blank'
              rel="noopener noreferrer"
              title='LinkedIn'><i className='fab fa-linkedin'/> LinkedIn</a></label>
          </div>

        </div>
      </div>
    </div>
    
  );
}

export default Contact;