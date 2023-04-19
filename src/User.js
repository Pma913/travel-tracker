class User {
  constructor(traveler) {
    this.id = traveler.id;
    this.name = traveler.name;
    this.tripData;
    this.totalCost = 0;
    this.upcomingDestinations;
    this.date;  
  }

  findTrips(trips) {
    this.tripData = trips.filter(trip => trip.userID === this.id);
    if (!this.tripData.length) {
      return "You have not taken any trips.";
    }
  }

  addItineraries(dest) {
    if (this.tripData === undefined) {
      return "You have no travel plans, past or present.";
    } 

    let destId = this.tripData.map(trip => trip.destinationID)
    let traveled = dest.filter(dest => destId.includes(dest.id));

    this.tripData.forEach(trip => {
      let dest = traveled.find(location => {
        return location.id === trip.destinationID;
      })
      trip.itinerary = dest;
    })
    
  }

  getTotalCost(year) {
    let tripsThisYear = this.tripData.filter(trip => trip.date.includes(year))
    let sumOfTrips = tripsThisYear.reduce((acc, trip) => {
      let tripDay = trip.itinerary.estimatedLodgingCostPerDay * trip.duration;
      let tripFlight = trip.itinerary.estimatedFlightCostPerPerson * trip.travelers;
      acc += (tripDay + tripFlight)
      return acc;
    }, 0);

    this.totalCost = sumOfTrips + (sumOfTrips * 0.1);
    
    if (this.totalCost === 0) {
      return "You have not taken any trips yet this year.";
    }
  }

  getUpcomingTrips() {
    this.getCurrentDate()
    this.upcomingDestinations = this.tripData.filter(trip => trip.date > this.date);

    if (!this.upcomingDestinations.length) {
      return "You have no upcoming trips."
    }
  }

  getCurrentDate() {
    let currentDate = new Date().toJSON().slice(0, 10);
    let splitDate = currentDate.split('')
    splitDate.forEach((num, index) => {
      if (num === '-') {
        splitDate.splice(index, 1, '/')
      }
    }) 
    
    this.date = splitDate.join('')
  }
}

export default User;