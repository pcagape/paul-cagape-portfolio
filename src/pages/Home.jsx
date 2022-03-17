import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';


// CSS
import '../styles/Home.css'

const _DOWNLOAD_CV_URL = 'https://drive.google.com/file/d/1Ggjq9rQj0XNs1C8LEWAUT6Go7ErLv74-/view';
const _MESSAGE1 = `Hi! I'm a web developer and a game developer. You can check some of my works on the Projects page or you can just contact me for any inquiries. Anyways, just take your time to look around.`
const _MESSAGE2 = `Thank you for visiting my page!`

export default function Home({ triggerTransition, history }) {
  console.log('test:', history);
  const { push: goToUrl, location: { pathname: urlPathname } } = useHistory();

  useEffect(() => {
    // console.log("style", style);
  }, []);

  async function onClickGoToLink(path) {
    // prevent transition when path is already the same
    if (urlPathname === path) return;

    triggerTransition(false);
    // pause ms while current component exit transition
    await ((ms) => new Promise(resolve => setTimeout(resolve, ms)))(100);
    goToUrl(path);
    // pause ms while next component enter transition
    await ((ms) => new Promise(resolve => setTimeout(resolve, ms)))(100);
    triggerTransition(true);
  }

  return (
    <div className="main-content px-4 py-5 my-5 text-center">

      <div className={`dev-prof col-lg-12 mt-4 mx-auto d-flex text-center text-middle justify-content-center`}>
        <div className='d-flex flex-column text-center text-middle justify-content-center'>
          <h2 className="fw-bold">Paul Angielo A. Cagape</h2>
          <h4 className="fw-normal">Web & Game Developer</h4>
        </div>
        <div className='ms-4'>
          <img className={'dev-pic'} src='./images/profile.jpg' alt='' width='250' height='250' />
        </div>
      </div>

      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">{_MESSAGE1}</p>
        <div className="home-buttons d-grid gap-2 d-sm-flex justify-content-sm-center">
          <a href='/' onClick={e=>{e.preventDefault(); onClickGoToLink('/contact');}} className="btn btn-outline-secondary btn-lg px-4 gap-3">Contact Me</a>
          <a href={_DOWNLOAD_CV_URL} target='_blank' rel="noopener noreferrer" className="btn btn-outline-secondary btn-lg px-4">Download CV</a>
        </div>
        <p className="lead mt-4">{_MESSAGE2}</p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          {/* <button type="button" className="btn btn-outline-secondary btn-lg px-4 gap-3">Play Me!</button> */}
        </div>
      </div>

    </div>
  )
}
