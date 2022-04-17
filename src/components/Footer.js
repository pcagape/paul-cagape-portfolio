import React from 'react';
import '../styles/Footer.css';

function Footer() {
  // const _MY_FB = 'https://www.facebook.com/Enjiero/about_work_and_education';
  const _MY_LINKEDIN = 'https://www.linkedin.com/in/paul-angielo-cagape-03a24167';

  return (
    <footer className="d-flex py-2">
      <div className="justify-self-start">
        <span className="mx-3">&copy; 2022 Paul Angielo Cagape</span>
      </div>

      <ul className="d-flex justify-self-end align-self-end list-unstyled d-start mx-3">

        <li className="ms-3">
          <a href={_MY_LINKEDIN} target='_blank' rel="noopener noreferrer">
            <i className="bi bi-linkedin" />
          </a>
        </li>

      </ul>
    </footer>
  );
}

export default Footer;