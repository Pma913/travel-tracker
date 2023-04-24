// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

import './css/styles.css';
import User from './User';
import { fetchAllData } from './apiCalls';
import { postTrip } from './apiCalls';
import { fetchTrips } from './apiCalls';
import { fetchTravelers } from './apiCalls';
import Agent from './Agent';
import { updateTrip } from './apiCalls';

/* Query Selectors */
const pastTrips = document.getElementById("pastTripsBox"),
      pendingTrips = document.getElementById("pendingTripsBox"),
      approvedTrips = document.getElementById("approvedTripsBox"),
      totalCost = document.getElementById("displayPrice"),
      userName = document.getElementById("username"),
      displayUser = document.getElementById("usernameDisplay"),
      dateInput = document.getElementById("date"),
      daysInput = document.getElementById("numberOfDays"),
      travelersInput = document.getElementById("numberOfTravelers"),
      destinationInput = document.getElementById("destination"),
      bookButton = document.getElementById("userInputBtn"),
      tripPrice = document.getElementById("newTripPrice"),
      inputs = document.querySelectorAll(".data-input"),
      loginBtn = document.getElementById("loginBtn"),
      password = document.getElementById("password"),
      loginPage = document.getElementById("loginBody"),
      mainPage = document.getElementById("mainPage"),
      destinationDisplay = document.getElementById("destinationDisplay"),
      showFormBtn = document.getElementById("bookTrip"),
      newTripForm = document.getElementById("newTripFormContainer"),
      formInputs = document.getElementById("formInputField"),
      destinationHeader = document.getElementById("destSelect"),
      dateError = document.getElementById("dateError"),
      locationSearch = document.getElementById("locationSearch"),
      formIncomplete = document.getElementById("errorMessage"),
      agentPage = document.getElementById("agentPage"),
      pendingTripsBox = document.getElementById("pendingTripsDisplay"),
      agentPrice = document.getElementById("agentTotalIncome"),
      todaysTrips = document.getElementById("todaysTripsDisplay"),
      clientDropDown = document.getElementById("clientDropDown"),
      agentDisplay = document.getElementById("displaySections"),
      agentClientDisplay = document.getElementById("clientDisplay"),
      clientTrips = document.getElementById("clientTrips"),
      tripTitle = document.getElementById("tripsTitle");

/* Global Variables */
let user,
    agent,
    destinations,
    travelers,
    number,
    locations; 

/* DOM manipulation */
const resetDestinationDisplay = () => {
  locations.forEach(location => {
    location.parentElement.classList.remove('hidden');
  })
}

const displayDestinations = () => {
  destinations.forEach(dest => {
    destinationDisplay.innerHTML += `<div class="img-box">
    <img src=${dest.image} alt=${dest.alt} class="img">
    <button class="select-destination btn" id="chooseDestination" name="${dest.destination}">${dest.destination}</button>
    </div>`;
  })
}

const displayData = () => {
  displayPast();
  displayUpcoming();
  displayPending();
  displayYearCost();
}

const displayPast = () => {
  user.getPastTrips()
  user.past.forEach(trip => {
    pastTrips.innerHTML += `<div height="250px" width="350px" class="dash-img-box">
      <h4 class="dest-name">${trip.itinerary.destination}</h4>
      <img height="90%" width="90%" src="${trip.itinerary.image}" alt="${trip.itinerary.alt} class="img">
      </div>`;
  });
}

const displayUpcoming = () => {
  user.getApprovedTrips();
  user.approved.forEach(trip => {
    approvedTrips.innerHTML += `<div height="250px" width="350px" class="dash-img-box">
    <h4 class="dest-name">${trip.itinerary.destination}</h4>
    <img height="90%" width="90%" src="${trip.itinerary.image}" alt="${trip.itinerary.alt} class="img">
    </div>`;
  });
}

const displayPending = () => {
  user.getPendingTrips();
  user.pending.forEach(trip => {
    pendingTrips.innerHTML += `<div height="250px" width="350px" class="dash-img-box">
    <h4 class="dest-name">${trip.itinerary.destination}</h4>
    <img height="90%" width="90%" src="${trip.itinerary.image}" alt="${trip.itinerary.alt} class="img">
    </div>`;
  })
} 

const displayYearCost = () => {
  totalCost.innerText = `$${user.totalCost}`;
}

const displayName = () => {
  displayUser.innerText = ` ${user.name}`;
}

const clearDisplay = () => {
  pastTrips.innerHTML = ``;
  pendingTrips.innerHTML = ``;
  approvedTrips.innerHTML = ``;
  totalCost.innerText = ``;
}

const clearAgentDisplay = () => {
  pendingTripsBox.innerHTML = "";
}

const displayAgentPage = (tripData) => {
  setClientListener();
  setTripsForToday();
  setYearlyIncome();
  setPendingTrips(tripData);
}

const setYearlyIncome = () => {
  agentPrice.innerText = Math.floor(agent.totalIncome);
}

const setPendingTrips = (tripData) => {
  tripData.forEach(trip => {
    const location = agent.locations.find(loc => loc.id === trip.destinationID)
    let user = travelers.find(pers => pers.id === trip.userID)
    pendingTripsBox.innerHTML += `<div class="pend-box">
    <div class="pend-labels"><h3>location:&nbsp;</h3><p> ${location.destination}</p></div>
    <div class="pend-labels"><h3>Client:&nbsp;</h3><p> ${user.name}</p></div>
    <div class="pend-labels"><h3>Date:&nbsp;</h3><p> ${trip.date}</p></div>
    <div class="pend-labels"><h3>Number of Travelers:&nbsp;</h3><p> ${trip.travelers}</p></div>
    <div class="pend-labels"><h3>Duration:&nbsp;</h3><p> ${trip.duration} days</p></div>
    <div class="pend-labels"><h3>trip id:&nbsp;</h3><p> ${trip.id}</p></div>
    <div class="button-box">
    <button name=${trip.id} class="approval-button" id="approveBtn">Approve</button>
    <button name=${trip.id} class="delete-button" id="deleteBtn">Revoke</button>
    </div>
    </div>`;
  })
}

const setClientDrop = () => {
  travelers.forEach(traveler => {
    clientDropDown.innerHTML += `<p class="client-name">${traveler.name}</p>`
  })
}

const setTripsForToday = () => {
  if (agent.todaysTrips.length === 1) {
    todaysTrips.innerHTML = `<p>There is currently 1 trip in progress today.</p>`;
  } else {
    todaysTrips.innerHTML = `<p>There are currently ${agent.todaysTrips.length} trips in progress today.</p>`;
  }
}

const displayClientTrips = () => {
  tripTitle.innerText = `${user.name}'s total trips`;
  user.tripData.forEach(trip => {
    clientTrips.innerHTML += `<div class="client-trips-box"><h3>Date: ${trip.date}</h3>
    <h3>Duration: ${trip.duration}</h3>
    <h3>Trip status: ${trip.status}</h3>
    <h3>Number of travelers: ${trip.travelers}</h3>
    <h3>Destination: ${trip.itinerary.destination}</h3></div>`
  })
}
  
/* Data manipulators */
const checkDate = () => {
  if (dateInput.value < user.date.split('/').join('-')) {
    dateError.innerText = "Please select a valid date";
    return true;
  } 
}

const removeTripFromAgent = (id) => {
  agent.newTrips.forEach((trip, index) => {
    if (trip.id === id) {
      agent.newTrips.splice(index, 1);
    }
  })
}

const approveTrip = (tripNum) => {
  let tripToApprove = agent.locateTrip(parseInt(tripNum))
  tripToApprove.status = "approved";
  tripToApprove.id = Date.now();
  deleteTrip(tripNum, agent.locateTrip(parseInt(tripNum)));
  postTrip(tripToApprove)
  removeTripFromAgent(tripNum);
}

const deleteTrip = (tripNum) => {
  let trip = agent.locateTrip(parseInt(tripNum))
  updateTrip(tripNum, trip)
  .then(res => {
    console.log('delete message:', res.message)
    clearAgentDisplay();
    setAgentData();
    removeTripFromAgent(tripNum);
  })
}

const setAgentData = () => {
  fetchAllData()
  .then(data => {
    agent = new Agent(data[0].trips, data[1].destinations, travelers);
    agent.getTodaysTrips();
    agent.getTotalIncome(agent.trips);
    agent.getTripRequests(agent.trips);
    displayAgentPage(agent.newTrips);
    setButtonListener();
    console.log(agent)
  })
}

const clearInputs = () => {
  dateInput.value = "";
  daysInput.value = "";
  travelersInput.value = "";
  destinationInput.value = "";
}

const setUserData = () => {
  fetchAllData()
  .then(data => {
    user = new User(travelers.find(trav => trav.id === number));
    user.findTrips(data[0].trips);
    user.addItineraries(data[1].destinations);
    user.getTotalCost();
    displayData();
    displayName();
    destinations = data[1].destinations;
    displayDestinations();
  })
};

const checkUsername = () => {
  let login = userName.value;
  let splitLogin = login.split('');
  let letters = [];
  let numbers = [];

  splitLogin.forEach(item => {
    if (Number.isInteger(parseInt(item))) {
      numbers.push(item);
    } else {
      letters.push(item);
    }
  })

  let word = letters.join('');
  number = parseInt(numbers.join(''));
  let travelerIds = travelers.map(trav => trav.id);
  if (word === "traveler" && travelerIds.includes(number)) {
    return true;
  }
}

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

const addData = () => {
  let selectedDestination = destinations.find(dest => {
    return dest.destination === destinationInput.value;
  });

  let tripData = {
    id: Date.now(), 
    userID: user.id, 
    destinationID: selectedDestination.id, 
    travelers: parseInt(travelersInput.value), 
    date: user.date, 
    duration: parseInt(daysInput.value), 
    status: 'pending',
    suggestedActivities: []
  }

  postTrip(tripData)
  .then(data => {
    console.log('post data: ',data);
    
    fetchTrips()
    .then(data => {
      user.findTrips(data.trips);
      user.addItineraries(destinations);
      user.getTotalCost();
      clearDisplay();
      displayData();
    })
  })
};

const getClientData = () => {
    user.findTrips(agent.trips);
    user.addItineraries(agent.locations);
    user.getTotalCost();
}

/* Event Listeners */
const setEventListeners = () => {
  const destButtons = document.querySelectorAll("#chooseDestination");
  
  destButtons.forEach(node => {
    node.addEventListener('click', () => {
      destinationDisplay.classList.add('hidden');
      formInputs.classList.remove('hidden');
      destinationHeader.classList.add('hidden');
      destinationInput.value = node.name;
      locationSearch.value = "";
    })
  })
}

const setClientListener = () => {
  const clients = document.querySelectorAll(".client-name")

  clients.forEach(client => {
    client.addEventListener('click', (target) => {
      agent.findUser(target.srcElement.innerText);
      user = new User(agent.client);
      getClientData();
      agentDisplay.classList.add('hidden');
      agentClientDisplay.classList.remove('hidden');
      displayClientTrips();
    })
  });
}

const setButtonListener = () => {
  const approval = document.querySelectorAll(".approval-button")
  const denial = document.querySelectorAll(".delete-button")

  approval.forEach(aprv => {
    aprv.addEventListener('click', (target) => {
    approveTrip(target.target.name)
    })
  })

  denial.forEach(den =>{
    den.addEventListener('click', (target) => {
    deleteTrip(target.target.name)
    })
  })
}

window.addEventListener('load', () => {
  fetchTravelers()
  .then(data => {
    travelers = data.travelers;
    setClientDrop();
  })
});

bookButton.addEventListener('click', (event) => {
  event.preventDefault();
  let inputFields = [];
  inputs.forEach(input => inputFields.push(input));
  if (checkDate()) {
    return
  } else if (inputFields.every(input => input.value)) {
    addData();
    formInputs.classList.add('hidden');
    mainPage.classList.remove('hidden');
    newTripForm.classList.add('hidden');
    destinationHeader.classList.remove('hidden');
    destinationDisplay.classList.remove('hidden');
    clearInputs();
    resetDestinationDisplay();
  } else {
    formIncomplete.innerText = "Please fill out all fields";
  }
});

inputs.forEach(input => {
  input.addEventListener('input', () => {
    if (destinationInput.value) {
      getPrice();
    }

    if (input.value) {
      formIncomplete.innerText = "";
    } 
  });
});

loginBtn.addEventListener('click', (event) => {
  event.preventDefault();
  
  if (checkUsername() && password.value === "travel") {
    loginPage.classList.add('hidden');
    mainPage.classList.remove('hidden');
    setUserData();
  } else if (password.value === "travel" && userName.value === "agency") {
    loginPage.classList.add('hidden');
    agentPage.classList.remove('hidden');
    agentDisplay.classList.remove('hidden');
    agentClientDisplay.classList.add('hidden')
    setAgentData();
  }
});

showFormBtn.addEventListener('click', () => {
  newTripForm.classList.remove('hidden');
  mainPage.classList.add('hidden');
  setEventListeners();
  dateInput.min = user.date.split('/').join('-');
  locations = document.querySelectorAll(".select-destination");
})

dateInput.addEventListener('input',  () => {
  if (dateInput.value >= user.date.split('/').join('-')) {
    dateError.innerText = "";
  } 
});

daysInput.addEventListener('input',  () => {
  if (daysInput.value < 1) {
    daysInput.value = "";
  }
});

travelersInput.addEventListener('input',  () => {
  if (travelersInput.value < 1) {
    travelersInput.value = "";
  }
});

locationSearch.addEventListener('input', () => {
  const inputCtrl = locationSearch.value.toUpperCase();
  
  locations.forEach(location => {
    const nameCtrl = location.name.toUpperCase();

    if (!nameCtrl.includes(inputCtrl)) {
      location.parentElement.classList.add('hidden');
    } else {
      location.parentElement.classList.remove('hidden');
    } 
  })
})