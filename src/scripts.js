// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

import './css/styles.css';
import User from './User';
import { fetchAllData } from './apiCalls';

/* Query Selectors */
const pastTrips = document.getElementById("pastTripsBox"),
      pendingTrips = document.getElementById("pendingTripsBox"),
      totalCost = document.getElementById("displayPrice"),
      userName = document.getElementById("username");

/* Global Variables */
let user; 

/* DOM manipulation */
const displayData = () => {
  displayPast();
  displayUpcoming();
  displayYearCost();
  displayName();
}

const displayPast = () => {
  user.tripData.forEach(trip => {
    pastTrips.innerHTML += `<h4>${trip.itinerary.destination}</h4>`;
  });
}

const displayUpcoming = () => {
  if (!user.upcomingDestinations.length) {
    pendingTrips.innerHTML += `<h4>You have no pending trips</h4>`;
  }
  user.upcomingDestinations.forEach(trip => {
    pendingTrips.innerHTML += `<h4>${trip.itinerary.destination}</h4>`;
  });
}

const displayYearCost = () => {
  totalCost.innerText = `$${user.totalCost}`
}

const displayName = () => {
  userName.innerText = ` ${user.name}`
}
/* Event Listeners */
window.addEventListener('load', () => {
  fetchAllData()
  .then(data => {
    user = new User(data[0].travelers[0])
    user.findTrips(data[1].trips)
    user.addItineraries(data[2].destinations)
    user.getUpcomingTrips();
    user.getTotalCost("2021");
    displayData();
  })
});


console.log('This is the JavaScript entry file - your code begins here.');
