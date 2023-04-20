// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

import './css/styles.css';
import User from './User';
import { fetchAllData } from './apiCalls';
import { postTrip } from './apiCalls';
import { fetchTrips } from './apiCalls';

/* Query Selectors */
const pastTrips = document.getElementById("pastTripsBox"),
      pendingTrips = document.getElementById("pendingTripsBox"),
      totalCost = document.getElementById("displayPrice"),
      userName = document.getElementById("username"),
      dateInput = document.getElementById("date"),
      daysInput = document.getElementById("numberOfDays"),
      travelersInput = document.getElementById("numberOfTravelers"),
      destinationInput = document.getElementById("destination"),
      bookButton = document.getElementById("userInputBtn"),
      tripPrice = document.getElementById("newTripPrice"),
      inputs = document.querySelectorAll(".data-input"),
      loginBtn = document.getElementById("loginBtn"),
      username = document.getElementById("username"),
      password = document.getElementById("password"),
      loginPage = document.getElementById("loginBody"),
      mainPage = document.getElementById("mainPage");

/* Global Variables */
let user,
    tripId,
    destinations; 

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

const clearDisplay = () => {
  pastTrips.innerHTML = ``;
  pendingTrips.innerHTML = ``;
  userName.innerText = ``;
  totalCost.innerText = ``;
}

/* Data manipulators */
const getPrice = () => {
  let selectedDestination = destinations.find(dest => {
    return dest.destination === destinationInput.value;
  });

  let dayPrice = selectedDestination.estimatedLodgingCostPerDay * daysInput.value;

  let travelerPrice = selectedDestination.estimatedFlightCostPerPerson * travelersInput.value;

  let agentFee = (dayPrice + travelerPrice) * 0.1;
  let total = dayPrice + travelerPrice + agentFee;

  tripPrice.innerText = `${total}`;
}

const formatDate = () => {
  let splitDate = dateInput.value.split('');
  splitDate.forEach((num, index) => {
    if (num === '-') {
      splitDate.splice(index, 1, "/");
    }
  })
  return splitDate.join('');
}

const addData = () => {
  let selectedDestination = destinations.find(dest => {
    return dest.destination === destinationInput.value;
  });

  let tripData = {
    id: tripId, 
    userID: user.id, 
    destinationID: selectedDestination.id, 
    travelers: parseInt(travelersInput.value), 
    date: formatDate(), 
    duration: parseInt(daysInput.value), 
    status: 'pending',
    suggestedActivities: []
  }

  postTrip(tripData)
  .then(data => {
    console.log('post data: ',data)
    
    fetchTrips()
    .then(data => {
      user.findTrips(data.trips)
      user.addItineraries(destinations)
      user.getUpcomingTrips();
      user.getTotalCost("2021");
      clearDisplay();
      displayData();
      tripId = data.trips.length + 1;
    })
  })
};

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
    tripId = data[1].trips.length + 1;
    destinations = data[2].destinations;
  })
});

bookButton.addEventListener('click', (event) => {
  event.preventDefault();
  addData();
});

inputs.forEach(input => {
  input.addEventListener('input', () => {
    if (destinationInput.value) {
      getPrice();
    }
  });
});

loginBtn.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('thats cool')
  if (username.value && password.value === "travel") {
  console.log('even cooler')
    loginPage.classList.add('hidden');
    mainPage.classList.remove('hidden');
  }
})
