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

  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const messageInput = useRef(null);



  
  const [_isSendingEmail, set_isSendingEmail] = useState(false);
  const _MY_FB = 'https://www.facebook.com/Enjiero/about_work_and_education';
  const _MY_LINKEDIN = 'https://www.linkedin.com/in/paul-angielo-cagape-03a24167';

  useEffect(() => {
    setShow(true);

    nameInput.current.addEventListener('focusout', (e) => {
      e.target.value = e.target.value.trim();

      validateAllInput();
      console.log(companyName, companyEmail, companyMessage);

      if(e.target.value.length < 5) return console.log(companyName);
      
      
      // e.target.value = 'pasmo';
      // const result = document.querySelector('.result');
      // result.textContent = `You like ${event.target.value}`;
    });
    // console.log(':::', nameInput.current.add);
  }, []);

  function sendEmail(e) {
    e.preventDefault();

    validateAllInput();

    console.log(companyName, companyEmail, companyMessage);

    return;

    if(_isSendingEmail) return alert('Wait for awhile...');
    console.log("sending email!");

    set_isSendingEmail(true);
    global.Email.send({
      Host: "smtp.mailtrap.io",
      Username: "f62cfe4c0c1071",
      Password: "db2f311af47fd0",
      To: 'paul.cagape@gmail.com',
      From: "testtest54321@gmail.com",
      Subject: "Sending Email using javascript",
      Body: "Well that was easy!!",
    })
    .then(function (message) {
      set_isSendingEmail(false);
      console.log(message, "mail sent successfully")
    });
  }

  function validateAllInput() {
    console.log("allllll")
    if(!isValidName(companyName)) setCompanyNameValid(false);
    else setCompanyNameValid(true);

    if(!isValidEmail(companyEmail)) setCompanyEmailValid(false);
    else setCompanyEmailValid(true);

    if(!isValidMessage(companyMessage)) setCompanyMessageValid(false);
    else setCompanyMessageValid(true);
  }

  function isValidName(name) {
    if(name.trim().length < 5) return false;

    return true;
  }

  function isValidEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  function isValidMessage(msg) {
    return true;
  }
  
  return (
    <div className='app-window'>
      <div className={'app-content dev-bio' + (show ?  ' window-show' : ' window-hide')}>
        <div className='contact-body'>
          <form className='contact-form' onSubmit={(e) => e.preventDefault()} method="POST" name="EmailForm">
            <label>Name {companyName} {companyNameValid ? '' : <i className="fas fa-exclamation-circle"/>}</label>
            <input type="text" id="fname" name="firstname" placeholder="Your Name/Company Name" maxLength={companyNameMaxLength} ref={nameInput} onChange={e => setCompanyName(e.target.value.trim())}/>
            <label>Email Address {companyEmail} {companyEmailValid ? '' : <i className="fas fa-exclamation-circle"/>}</label>
            <input type="text" id="email" name="emailaddress" placeholder="Email Address" maxLength={companyEmailMaxLength} ref={emailInput} onChange={e => setCompanyEmail(e.target.value.trim())}/>
            <label>Message {companyMessage} {companyMessageValid ? '' : <i className="fas fa-exclamation-circle"/>}</label>
            <textarea placeholder="Message..." maxLength={companyMessageMaxLength} ref={messageInput} onChange={e => setCompanyMessage(e.target.value)}></textarea>
            <Button className="contact-form-submit" onClick={sendEmail} >Submit</Button>
          </form>
          <div className="contact-details">
            <label><i className='fas fa-map-marker-alt' /> General Santos City, 9500 Phillippines</label>
            <label><i className='fas fa-phone' /> (+63)9254546371</label>
            <label><i className='far fa-envelope' /> paul.cagape@gmail.com</label>
            <label><a
              className='social-icon-link facebook'
              href={_MY_FB}
              target='_blank'
              rel="noopener noreferrer"
              title='Facebook'><i className='fab fa-facebook'/> Facebook</a></label>
            <label><a
              className='social-icon-link facebook'
              href={_MY_LINKEDIN}
              target='_blank'
              rel="noopener noreferrer"
              title='Facebook'><i className='fab fa-linkedin'/> LinkedIn</a></label>
          </div>

        </div>
      </div>
    </div>
    
  );
}

export default Contact;