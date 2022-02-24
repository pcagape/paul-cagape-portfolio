import React, { useState, useEffect } from 'react';

function Skills () {
  const [show, setShow] = useState(false);
  const experienceList = [
    {name: 'Software Engineer', desc: 'Web, React', year: 3},
    {name: 'Game Developer', desc: 'ImpactJS', year: 4.5},
    {name: 'Javascript Developer', desc: '', year: 9},
  ];
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
    {name: 'MongoDB', imgUrl: './images/icon-mongodb.png'},
    {name: 'MySQL', imgUrl: './images/icon-mysql.png'},
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
          <div className='experience-list'>
          {experienceList.map((exp, index)=>{
              return (
                <div key={exp.name} className='exp-item'>
                  <label className='exp-item-name'>{exp.name}</label>
                  <label className='exp-item-desc'>{exp.desc} {'(' + (typeof exp.year == 'string' ? (exp.year+')') : ( exp.year > 1 ? exp.year+' years)' : exp.year+' year)') )}</label>
                </div>
              )
            })}
          </div>
          <div className='skills-list'>
            {skillsList.map((skill, index)=>{
              return (
                <div key={skill.name} className='skill-item'>
                  <img src={skill.imgUrl} alt=''/>
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