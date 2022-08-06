import iconoBingoBlanco from './sources/bingo_icono_blanco_small.png';
import bingoTitle from './sources/bingo_letra_title_2.png';
import './styles/AppHeaderComponent.css'

import React from 'react'

export const AppHeaderComponent = () => {
  return (
    <div className="app-header">
        <div className="presentation-image">
            <img id='bingo-icon' src={iconoBingoBlanco} height='80px' width='auto' alt="icono bingo en blanco" />
            <img id='bingo-title' src={bingoTitle} height='115px' width='auto' alt="bingo title white and yellow" />
        </div>
        <p>Bingo game simulator. Press the button to select a random number.</p>
    </div>
    )
}

