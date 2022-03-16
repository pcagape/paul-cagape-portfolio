import React, { useEffect } from 'react';
import '../styles/GameBackground.css';

function GameBackground() {
  // const _SHAPE = "polygon";
  // const _SHAPE_COLOR = "#F2F2F2";
  // const _SHAPE_STROKE_COLOR = "#4A96D9";
  // const _LINK_COLOR = "#F2F2F2";
  // let thisGame = null;

  useEffect(() => {
    // initParticleJS();
    // initStats();
    

  }, []);
  return (
    <canvas id="game-canvas" className='background-canvas' width="600" height="360">
    </canvas>
  );
}
export default GameBackground;