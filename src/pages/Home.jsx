import React, { useEffect } from 'react';
import '../styles/Home.css'

const _MESSAGE1 = `Hi! I'm a web developer and a game developer. You can check some of my works on the Projects page or you can just contact me for any inquiries. Anyways, just take your time to look around.`
const _MESSAGE2 = `Thank you for visiting my page!`

export default function Home() {

  useEffect(()=>{
    // console.log("style", style);
  }, []);

  return (
    <div className="main-content px-4 py-5 my-5 text-center">

      <div className={`dev-prof col-lg-12 mt-4 mx-auto d-flex text-center text-middle justify-content-center`}>
        <div className='d-flex flex-column text-center text-middle justify-content-center'>
          <h2 className="fw-bold">Paul Angielo A. Cagape</h2>
          <h4 className="fw-normal">Web & Game Developer</h4>
        </div>
        <div className='ms-4'>
          <img className={'dev-pic'} src='./images/profile.jpg' alt='' width='250' height='250'/>
        </div>
      </div>

      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">{_MESSAGE1}</p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button type="button" className="btn btn-outline-secondary btn-lg px-4 gap-3">Contact Me</button>
          <button type="button" className="btn btn-outline-secondary btn-lg px-4">Download CV</button>
        </div>
        <p className="lead mt-4">{_MESSAGE2}</p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          {/* <button type="button" className="btn btn-outline-secondary btn-lg px-4 gap-3">Play Me!</button> */}
        </div>
      </div>

    </div>
  )
}
