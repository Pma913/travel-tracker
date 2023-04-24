class User {
  constructor(traveler) {
    this.id = traveler.id;
    this.name = traveler.name;
    this.tripData;
    this.totalCost = 0;
    this.upcomingDestinations;
    this.past = [];
    this.pending = [];
    this.approved = [];
    this.date = new Date().toJSON().slice(0, 10).split('-').join('/');  
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

  getPastTrips() {
    this.tripData.forEach(trip => {
      if (trip.date < this.date) {
        this.past.push(trip)
      }
    })
  }

  getPendingTrips() {
    this.pending = this.tripData.filter(trip => trip.status === "pending");
    
    if (!this.pending.length) {
      return "You have no upcoming trips."
    }
  }

  getApprovedTrips() {
    this.approved = this.tripData.filter(trip => {
      if (trip.status === "approved" && trip.date >= this.date) {
        return true;
      } 
    })

    if (this.approved.length === 0) {
      return "You have no upcoming trips.";
    }
  }
}

export default User;