import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <div className='social-media-wrap'>
        <div className='footer-logo'>
            <a href='https://reactjs.org/' target='_blank' className='social-logo'>
              <i className='fab fa-react' title='Powered by Reactjs' />
            </a>
          </div>
          <small className='website-rights'></small>
          <div className='social-icons'>
            <a
              className='social-icon-link facebook'
              href='https://www.facebook.com/Enjiero/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </a>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' />
            </Link>
          </div>
      </div>
    </div>
  );
}

export default Footer;



