import React from 'react';
import Particles from 'react-particles-js';
import MediaQuery from 'react-responsive';

import './ParticlesBG.css';

const particlesOptionsDesktop = {
  particles: {
    number: {
      value:200,
      density: {
        enable:true,
        value_area: 800
      }
    }
  }
}
const particlesOptionsPhone = {
      "particles": {
          "number": {
              "value": 20,
              "density": {
                  "enable": false
              }
          },
          "size": {
              "value": 10,
              "random": true
          },
          "move": {
              "direction": "bottom",
              "out_mode": "out"
          },
          "line_linked": {
              "enable": false
          }
      },
      "interactivity": {
          "events": {
              "onclick": {
                  "enable": true,
                  "mode": "remove"
              }
          },
          "modes": {
              "remove": {
                  "particles_nb": 10
              }
          }
      }
}

const ParticlesBG = () => {
	return (
		<div>
			<MediaQuery query="(min-width: 500px)">
			<Particles className='particles' params={particlesOptionsDesktop}/>
			</MediaQuery>
			<MediaQuery query="(max-width: 500px)">
			<Particles className='particles' params={particlesOptionsPhone}/>
			</MediaQuery>			
		</div>
		);
}

export default ParticlesBG;


