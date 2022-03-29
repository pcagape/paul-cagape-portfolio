import React, { useEffect, useState } from 'react';
import '../styles/Loading.css';

function Loading({ assetsLoaded }) {
    const [dot, setDot] = useState('');

    useEffect(()=>{
        setTimeout(()=>{
            let dots = dot + ". ";
            if(dots.length > 12) dots = "";
            setDot(dots);
        }, 500);
    }, [dot]);

    return (
        <div className='position-absolute start-0 w-100 h-100 d-flex align-items-center justify-content-center' style={{backgroundColor: '#080f16'}}>
            <label>{dot}</label>
            <div className="ship" style={{ width: '37px', height: '19px', background: "url('./images/game/player.png')"}}>
                <div className="exhaust" style={{ width: '32px', height: '32px', background: "transparent url('./images/game/exhaust.png') 0 0 no-repeat"}}></div>
            </div>
        </div>
    );
}

export default Loading;