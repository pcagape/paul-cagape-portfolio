import React from 'react';
import '../styles/Projects.css';
import { v4 as uuidv4 } from 'uuid';

export default function Projects() {
  const projectList = [
    {name:'This Page', imgUrl: './images/portfolio-s1.png', desc:'This page is purely running on React, I tried not using any popular React framework to take the challenge of producing a website from scratch to refresh my knowledge on React Development and Website design while working with CSS. I tried using just plain CSS but was playing with LESS and SASS then decide to stick with SASS for very useful features that helps me in my design.'},
    {name:'MarketJS Games', imgUrl: './images/marketjs-s1.png',
      desc: "While employed in MarketJS, we're developing Html5-Games running on Javascript, we work solely in Node environmennt to build and compile our games. Below are some of the games I develop and got permission to share from my previous employer.",
      samples:[
      {name:'Hardest Game', url:'https://www.marketjs.com/item/hardest-game-on-earth'},
      {name:'Soccer Royale', url:'https://www.marketjs.com/item/bobblehead-soccer-royale'},
      {name:'Mango Piggy', url:'https://www.marketjs.com/item/mango-piggy-piggy-vs-bad-veggies'},
      {name:'Bowman', url:'https://www.marketjs.com/item/bill-the-bowman'},
      {name:'Hexable', url:'https://www.marketjs.com/item/hexable'},
      {name:'Tetris', url:'https://www.marketjs.com/item/trixology'},
      {name:'Finger Spinner', url:'https://www.marketjs.com/item/finger-spinner'},
      {name:'Word Pop', url:'https://www.marketjs.com/item/omg-word-pop'},
      ]
    },
    { name: 'Micab', imgUrl: './images/micab-web-s1.png',
      desc: "Micab Web - Taxi Reservation System that I single-handly develop the frontend side using Reactjs in Redux Architecture. The web-app main purpose is to able to book taxi from the browser used by a specific Taxi-Company client." },
    { name: 'NextIX/ZOOG', imgUrl: './images/nextix-zoog-s1.png',
      desc: 'Reward Banking System - Started as Web Developer working on this system then became Fullstack Developer to help the development of the backend. The system was originally a third-party system before we migrated it to Java Spring Boot & Spring MVC plus AngularJS then the team decided to use ReactJS as the frontend. This was my first exposure to Angularjs/Reactjs/Git and Node environment development.' },
    {name:'Torqes Games', imgUrl:'./images/torqes-s0.png', samples: [
      {name:'Screenshot #1', url:'./images/torqes-s1.png'},
      {name:'Screenshot #2', url:'./images/torqes-s2.png'},
      {name:'Screenshot #3', url:'./images/torqes-s3.png'},
      {name:'Screenshot #4', url:'./images/torqes-s4.png'},
      {name:'Screenshot #5', url:'./images/torqes-s5.png'}
    ], desc:'Html5 educational app develop from Adobe Animate using ActionScript and a little bit of Javascript codes. This was my introduction to Web development solely developing Interactive and Educational applications intend for learning use.'},
    // { name: 'Micab', imgUrl: '', desc: "." },
  ];

  return (
    <div className="main-content pt-4 mb-5 text-center">

      <div className="row py-lg-5">
        <div className="row col-md-12 mx-auto">
          <h1 className="fw-bold">Recent Projects</h1>
        </div>
      </div>

      <div className="album py-2 pb-4">
        <div className="container">

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

            {projectList.map((item) => {
              return (
                <div key={uuidv4()} className="col">
                  <div className="project-card card shadow-sm">
                    <img src={item.imgUrl} alt='' className="bd-placeholder-img card-img-top" width="100%" height="225" style={{ width: '100%' }} />
                    <div className="card-body">
                      <p className="card-text">{item.desc}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex w-100 justify-content-center" style={{flexWrap: 'wrap'}}>

                          {item?.samples?.map((item) => {
                            return(
                              <a key={uuidv4()} href={item.url} target='_blank' rel="noopener noreferrer" className="row">
                                {item.name}
                              </a>
                            )
                          })}

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

          </div>
        </div>
      </div>

    </div>
  )
}