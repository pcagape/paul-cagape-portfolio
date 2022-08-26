import React from 'react';
import '../assets/styles/Skills.css';

function Skills({ isShowContent, children }) {
  const experienceList = [
    { name: 'Web Software Engineer', desc: 'Reactjs/Nodejs', year: '3+ years' },
    { name: 'Game Developer', desc: 'ImpactJS/Nodejs', year: '4+ years' },
    { name: 'Javascript Developer', desc: '', year: '8+ years' },
  ];
  const skillsList = [
    { name: 'HTML5', imgUrl: './images/icon-html5.png' },
    { name: 'Javascript', imgUrl: './images/icon-js.png' },
    { name: 'CSS', imgUrl: './images/icon-css.png' },
    { name: 'NodeJS', imgUrl: './images/icon-nodejs.png' },
    { name: 'ReactJS', imgUrl: './images/icon-reactjs.png' },
    { name: 'Redux', imgUrl: './images/icon-redux.png' },
    { name: 'Git', imgUrl: './images/icon-git.png' },
    { name: 'ImpactJS', imgUrl: './images/icon-impactjs.png' },
  ];

  const secondarySkills = [
    { name: 'Java', imgUrl: './images/icon-java.png' },
    { name: 'Spring Boot', imgUrl: './images/icon-spring-boot.png' },
    { name: 'SailsJS', imgUrl: './images/icon-sailsjs.png' },
    { name: 'RESTful', imgUrl: './images/icon-restful.png' },
    { name: 'MongoDB', imgUrl: './images/icon-mongodb.png' },
    { name: 'MySQL', imgUrl: './images/icon-mysql.png' }
  ];

  const secondaryExperienceList = [
    { name: 'Backend Developer', desc: 'Nodejs/Java/Springboot', year: '2+ years' },
  ];

  return (
    <div className={`main-content ${isShowContent ? 'main-content-enter ' : 'main-content-exit '} text-center`}>

      <div className="row pt-3">
        <div className="row col-md-12 mx-auto">
          <h1 className="fw-bold">Skills & Experience:</h1>
        </div>
      </div>

      <section className="text-center container">
        <div className="row col-md-12 col-md-8 mx-auto">

          {experienceList.map((exp, index) => {
            return (
              <div key={exp.name} className="col-sm-4 d-flex flex-column my-3 mx-auto">
                <h4 className="fw-light m-0">{exp.name}</h4>
                <label className='fst-italic'>
                  {exp.desc} {'(' + (typeof exp.year == 'string' ? (exp.year + ')') : (exp.year > 1 ? exp.year + ' years)' : exp.year + ' year)'))}
                </label>
              </div>
            )
          })}

          <div className="col-lg-12 my-2"></div>

          {skillsList.map((skill, index) => {
            return (
              <div key={skill.name} className="skill-item d-flex flex-column text-center text-middle justify-content-center mx-auto m-2 p-2">
                <img src={skill.imgUrl} alt='' className="mx-auto" style={{ width: '100px' }} />
                <label>{skill.name}</label>
                {skill.tooltip ? (<div className="skill-item-tooltip">{skill.tooltip}</div>) : ""}
              </div>
            )
          })}

        </div>
      </section>

      <div className="row pt-3">
        <div className="row col-md-12 mx-auto">
          <h1 className="fw-bold">Secondary:</h1>
        </div>
      </div>

      <section className="text-center container">
        <div className="row col-md-12 col-md-8 mx-auto">

          {secondaryExperienceList.map((exp, index) => {
            return (
              <div key={exp.name} className="col-sm-4 d-flex flex-column my-3 mx-auto">
                <h4 className="fw-light m-0">{exp.name}</h4>
                <label className='fst-italic'>
                  {exp.desc} {'(' + (typeof exp.year == 'string' ? (exp.year + ')') : (exp.year > 1 ? exp.year + ' years)' : exp.year + ' year)'))}
                </label>
              </div>
            )
          })}

          <div className="col-lg-12 my-2"></div>

          {secondarySkills.map((skill, index) => {
            return (
              <div key={skill.name} className="skill-item d-flex flex-column text-center text-middle justify-content-center mx-auto m-2 p-2">
                <img src={skill.imgUrl} alt='' className="mx-auto" style={{ width: '100px' }} />
                <label>{skill.name}</label>
                {skill.tooltip ? (<div className="skill-item-tooltip">{skill.tooltip}</div>) : ""}
              </div>
            )
          })}

        </div>
      </section>

      {children}
    </div>
  );
}

export default Skills;