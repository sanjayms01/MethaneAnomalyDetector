import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Amplify } from 'aws-amplify'
import config from './aws-exports'

// STYLES
import './assets/vendor/animate.css/animate.min.css'
import './assets/vendor/aos/aos.css'
import './assets/vendor/bootstrap/css/bootstrap.min.css'
import './assets/vendor/bootstrap-icons/bootstrap-icons.css'
import './assets/vendor/boxicons/css/boxicons.min.css'
import './assets/vendor/glightbox/css/glightbox.min.css'
import './assets/vendor/remixicon/remixicon.css'
import './assets/vendor/swiper/swiper-bundle.min.css'

import './assets/css/style.css';
import './assets/js/main.js';


Amplify.configure(config);
ReactDOM.render(<App />, document.getElementById("root"));
