import React from 'react';
import '../assets/styles/Projects.css';

export default function ProjectCard({item}) {

  return (
    <div className="col">
        <div className="project-card card shadow-sm">
        <img src={item.imgUrl} alt='' className="bd-placeholder-img card-img-top" width="100%" height="225" style={{ width: '100%' }} />
        <div className="card-body" style={{ display: 'none' }}>
            <p className="card-text">{item.desc}</p>
            <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex w-100 justify-content-center" style={{ flexWrap: 'wrap' }}>

                {item?.samples?.map((item, idx) => {
                return (
                    <a key={`sample_${idx}`} href={item.url} target='_blank' rel="noopener noreferrer" className="row">
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
}