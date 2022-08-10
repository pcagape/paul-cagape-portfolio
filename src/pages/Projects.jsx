import React, { useState } from 'react';
import '../styles/Projects.css';
import ProjectCard from '../components/ProjectCard';
import myDetails from '../assets/details.js';

export default function Projects({ children, isShowContent }) {  
  const [projectList, setProjectList] = useState(()=> myDetails.projectList);
  return (
    <div className={`main-content ${isShowContent ? 'main-content-enter ' : 'main-content-exit '} pb-5 text-center`}>

      <div className="row pt-3">
        <div className="row col-md-12 mx-auto">
          <h1 className="fw-bold">Recent Projects</h1>
        </div>
      </div>

      <div className="album py-4 pb-4">
        <div className="container">

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

            {projectList.map((item, idx) => (<ProjectCard key={`project_${idx}`} item={item}/>))}

          </div>
        </div>
      </div>
    </div>
  )
}