import React, { useRef, useState } from 'react';

// CSS
import '../styles/Contact.css';

// Component
import Button from '../components/Button.js';

function Contact({ showAlert, isShowContent }) {
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyMessage, setCompanyMessage] = useState('');
  const [_isSendingEmail, set_isSendingEmail] = useState(false);

  const messageForm = useRef(null);
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const messageInput = useRef(null);

  const companyNameMaxLength = 50;
  const companyEmailMaxLength = 320;
  const companyMessageMinLength = 10;
  const companyMessageMaxLength = 2500;

  const _MY_PHONENUMBER = "(+63)976-1930-672";
  const _NEXT_EMAIL_SEND = 120; // Seconds
  const _MY_EMAIL = 'paul.cagape@gmail.com'
  // const _MY_FB = 'https://www.facebook.com/Enjiero/about_work_and_education';
  const _MY_LINKEDIN = 'https://www.linkedin.com/in/paul-angielo-cagape-03a24167';

  function sendEmail(e) {
    e.preventDefault();

    // Check inputs validity
    if (!messageForm.current.checkValidity())
      return messageForm.current.reportValidity();

    var lastSend = new Date(window.localStorage.getItem("_LAST_SEND_EMAIL"));
    var now = new Date();
    var diffSeconds = (now.getTime() / 1000) - (lastSend.getTime() / 1000);

    if (!(diffSeconds > _NEXT_EMAIL_SEND))
      return showAlert('You have just recently sent a message, please try again after a minute.','error', 3000);

    // Send alert if just recently send an email to prevent spam
    if (_isSendingEmail) return showAlert('Wait for awhile...');

    // send email
    console.log("Sending email...")
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

        if (message === 'OK') {
          showAlert('Email sent successfully!.');
          console.log(message, "Email sent successfully!");
        } else {
          showAlert('Something went wrong! Please try again.', 'error');
          console.error(message);
        }
      });
  }


  return (
    <div className={`main-content ${isShowContent ? 'main-content-enter ' : 'main-content-exit '}mx-2 py-4 pb-5 mb-3 text-center`}>

      <div className="row align-items-md-stretch mx-2">

        <div className="col-md-6 mt-2">
          <div className="contact-form h-100 p-5 text-white bg-dark rounded-3">

            <form ref={messageForm} className="needs-validation text-start">
              <div className="row g-3">

                <div className="col-12">
                  <label className="form-label">Name</label>
                  <div className="input-group has-validation">
                    <input type="text" className="form-control" name="firstname" placeholder="Your Name/Company Name" maxLength={companyNameMaxLength} ref={nameInput} onChange={e=>setCompanyName(e.target.value.trim())} required />
                    <div className="invalid-feedback">
                      Your username is required.
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-control" name="emailaddress" placeholder="Email Address" maxLength={companyEmailMaxLength} ref={emailInput} onChange={e=>setCompanyEmail(e.target.value.trim())} required />
                  <div className="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label">Message</label>
                  <textarea className="form-control" placeholder="Message . . ." minLength={companyMessageMinLength} maxLength={companyMessageMaxLength} ref={messageInput} onChange={e=>setCompanyMessage(e.target.value.trim())} style={{height:'120px'}} required />
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>

                <hr className="my-4" style={{'backgroundColor':'var(--COLOR5)'}}/>

                <Button className='w-100' onClick={sendEmail}>Submit</Button>
              </div>
            </form>

          </div>
        </div>

        <div className="col-md-6 mt-2">
          <div className="contact-form contacts d-flex flex-column h-100 p-5 bg-light rounded-3 text-center text-middle justify-content-center">
            <label>
              <i className='fas fa-map-marker-alt me-2' />
              General Santos City, 9500 Phillippines
            </label>
            <label>
              <i className='fas fa-phone me-2' />
              {_MY_PHONENUMBER}
            </label>
            <label>
              <a className='social-icon-link'
                href={'mailto:' + _MY_EMAIL}
                title='My Email Address'>
                <i className='far fa-envelope me-2' />
                {_MY_EMAIL}
              </a>
            </label>
            <label>
              <a className='social-icon-link'
                href={_MY_LINKEDIN}
                target='_blank'
                rel="noopener noreferrer"
                title='LinkedIn'><i className='fab fa-linkedin me-2' />
                LinkedIn
              </a>
            </label>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Contact;