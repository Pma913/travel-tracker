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

  getTotalCost() {
    let splitDate = this.date.split('/');
    let oneYearAgo = splitDate.splice(0,1,splitDate[0] - 1).join('/');
    let tripsThisLastYear = this.tripData.filter(trip => trip.date >= oneYearAgo)
    let sumOfTrips = tripsThisLastYear.reduce((acc, trip) => {
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
    this.past = this.tripData.filter(trip => trip.date < this.date && trip.status === "approved");
  }

  getPendingTrips() {
    this.pending = this.tripData.filter(trip => trip.status === "pending");
    
    if (!this.pending.length) {
      return "You have no upcoming trips."
    }
  }

  getApprovedTrips() {
    this.approved = this.tripData.filter(trip => trip.status === "approved" && trip.date >= this.date);

    if (this.approved.length === 0) {
      return "You have no upcoming trips.";
    }
  }
}

export default User;