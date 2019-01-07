import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './App';
import ParticlesBG from './components/ParticlesBG/ParticlesBG';


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

ReactDOM.render(
	<div>
		<ParticlesBG />
		<App />
	</div>
	, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
