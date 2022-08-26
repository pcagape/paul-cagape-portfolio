import React from 'react';
import '../assets/styles/Footer.css';

// const _MY_FB = 'https://www.facebook.com/Enjiero/about_work_and_education';
const _MY_LINKEDIN = 'https://www.linkedin.com/in/paul-angielo-cagape-03a24167';
const _MY_GITHUB = 'https://github.com/pcagape';

function Footer() {

  return (
    <footer className="row py-2">
      <div className="col-8">
        <span className="mx-3">&copy; 2022 Paul</span>
      </div>

      <ul className="list-unstyled col-4">

        <li className="justify-self-end px-3 text-end">
          <a href={_MY_GITHUB} target='_blank' rel="noopener noreferrer">
            <i className="bi bi-git" />
          </a>
          <a href={_MY_LINKEDIN} target='_blank' rel="noopener noreferrer">
            <i className="bi bi-linkedin" />
          </a>
        </li>

      </ul>
    </footer>
  );
}

export default Footer;