import React, { useEffect } from 'react';
import '../styles/GameBackground.css';
import SpaceGame from '../others/space-game';

function GameBackground() {
  useEffect(() => SpaceGame(), []);
  return (
    <canvas id="game-canvas" width="600" height="360">
    </canvas>
  );
}
export default GameBackground;