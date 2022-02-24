import React, { useState, useEffect } from 'react';
import { Modalv2 } from '../components/Modalv2';

export default function Projects() {
  const [show, setShow] = useState(false);

  const projectList = [
    {name:'This Page', imgUrl: './images/portfolio-s1.png', desc:'This page is purely running on React, I tried not using any popular React framework to take the challenge of producing a website from scratch to refresh my knowledge on React Development and Website design while working with CSS. I tried using just plain CSS but was playing with LESS and SASS then decide to stick with SASS for very useful features that helps me in my design.'},
    {name:'MarketJS Games', imgUrl: './images/marketjs-s1.png', desc: 'Html5-Games running on ImpactJS a Javascript framework for game development. And below are some of the games I develop and got permission to share from my previous employer.', links:[
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
    {name:'Torqes Games', imgUrl:'./images/torqes-s0.png', images: [
      './images/torqes-s1.png',
      './images/torqes-s2.png',
      './images/torqes-s3.png',
      './images/torqes-s4.png',
      './images/torqes-s5.png'
    ], desc:'Html5-Games develop from Adobe Animate using ActionScript and a little bit of Javascript codes. This was my introduction to Web and Game development solely developing Interactive and Educational applications intend for school use. Wasn\'t able to acquire permission to share the games but what I have are screenshots of some games I made wayback with my previous employer Torqes INC.'},
    {name:'Others', imgUrl: '', desc:'A few of my old projects has still issue with the permission of sharing. While I\'m working on it you can just check my CV for my previous project\'s details which you can download on the Homepage.'},
  ];

  useEffect(() => {
    setShow(true);
  }, []); 
  return (
    <div className='app-window'>
      <div className={'app-content' + (show ?  ' window-show' : ' window-hide')}>
        <div className='projects-container'>
          <div className='projects-title'>
            <h1>Recent Projects</h1>
          </div>
          <div className='projects-list'>
            {projectList.map((project, index) => {
              return <div key={project.name} className='projects-item'>
                <Modalv2 name={project.name} className=''>
                  <div>
                    <img className='projects-item-img' src={project.imgUrl || ''} alt=''/>
                    {project?.images?.map((image, index)=>{
                      return <img key={image} className='projects-item-img-screenshot' src={image || ''} alt=''/>
                    })}
                  </div>
                  {project.desc ? <label className='project-desc'>{project.desc}</label> : ''}
                  {project.links ? <div className='project-links'>
                    {project.links.map((link, index) =>{
                      return <a key={link.url} className='project-links-item'
                        href={link.url}
                        target='_blank'
                        rel="noopener noreferrer"
                        title={link.name}>{link.name}</a>
                    })}
                  </div> : ''}
                </Modalv2>
              </div>
            })}
            
          </div>
        </div>
      </div>
    </div>
  )
}
