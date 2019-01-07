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
  particles: {
    number: {
      value:60,
      density: {
        enable:true,
        value_area: 800
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


