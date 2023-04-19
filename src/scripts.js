// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

import './css/styles.css';
import User from './User';
import { fetchAllData } from './apiCalls';

window.addEventListener('load', () => {
  fetchAllData()
  .then(data => {
    console.log(data)
  })
});


console.log('This is the JavaScript entry file - your code begins here.');
