import React, { useRef, useState, useEffect } from 'react';
import { Button } from '../components/Button';


function Skills () {
  const [show, setShow] = useState(false);
  const skillsList = [
    {name: 'HTML5', imgUrl: './images/icon-html5.png'},
    {name: 'Javascript', imgUrl: './images/icon-js.png'},
    {name: 'CSS', imgUrl: './images/icon-css.png'},
    {name: 'NodeJS', imgUrl: './images/icon-nodejs.png'},
    {name: 'ReactJS', imgUrl: './images/icon-reactjs.png'},
    {name: 'Git', imgUrl: './images/icon-git.png'},
    {name: 'ImpactJS', imgUrl: './images/icon-impactjs.png'},
    {name: 'SailsJS', imgUrl: './images/icon-sailsjs.png'},
    {name: 'Java', imgUrl: './images/icon-java.png'},
    {name: 'Redux', imgUrl: './images/icon-redux.png'},
    {name: 'RESTful', imgUrl: './images/icon-restful.png'},
    {name: 'C#', imgUrl: './images/icon-c-sharp.png'},
    {name: 'Photoshop', imgUrl: './images/icon-photoshop.png'},
    {name: 'Adobe Animate', imgUrl: './images/icon-adobe-animate.png'},
    {name: 'Vegas Pro', imgUrl: './images/icon-vegaspro.png'},
    
  ];


  useEffect(() => {
    setShow(true);
  }, []);  
  return (
    <div className='app-window'>
      <div className={'app-content' + (show ?  ' window-show' : ' window-hide')}>
        <div className='skills-body'>
          <div className='skills-title'>
            <h1>Skills & Experience</h1>
          </div>
          <div className='skills-list'>
            {skillsList.map((skill, index)=>{
              return (
                <div key={skill.name} className='skill-item'>
                  <img className='dev-pic' src={skill.imgUrl} alt=''/>
                  <label>{skill.name}</label>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </div>
    
  );
}

export default Skills;