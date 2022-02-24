import React from 'react';

function Footer() {
  // const _MY_FB = 'https://www.facebook.com/Enjiero/about_work_and_education';
  const _MY_LINKEDIN = 'https://www.linkedin.com/in/paul-angielo-cagape-03a24167';
  
  return (
    <div className='footer-container'>
      <div className='social-media-wrap'>
        <div className='footer-logo'>
            <a href='https://reactjs.org/' target='_blank' rel="noopener noreferrer" className='social-logo'>
              <i className='fab fa-react' title='Powered by Reactjs' />
            </a>
          </div>
          <small className='website-rights'>Copyright © 2022 by Paul. All Rights Reserved.</small>
          <div className='social-icons'>
            {/* <a className='social-icon-link facebook'
              href={_MY_FB}
              target='_blank'
              rel="noopener noreferrer"
              title='Facebook'><i className='fab fa-facebook' /></a> */}
            <a className='social-icon-link twitter'
              href={_MY_LINKEDIN}
              target='_blank'
              rel="noopener noreferrer"
              title='LinkedIn'><i className='fab fa-linkedin' /></a>
          </div>
      </div>
    </div>
  );
}

export default Footer;



