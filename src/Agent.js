class Agent {
  constructor(trips, locations, users) {
    this.date = new Date().toJSON().slice(0,10).split('-').join('/');
    this.trips = trips;
    this.locations = locations;
    this.newTrips;
    this.totalIncome;
    this.todaysTrips;
    this.users = users
    this.client;
  }

  getTripRequests() {
    this.newTrips = this.trips.filter(trip => trip.status === 'pending')
  }

  getTotalIncome() {
    let splitDate = this.date.split('/')
    splitDate.splice(0,1,splitDate[0] - 1)
    let lastYear = splitDate.join('/')
    let pastYearTrips = this.trips.filter(trip => trip.date > lastYear)
  
    let price = pastYearTrips.reduce((acc, trip) => {
      let location = this.locations.find(dest => dest.id === trip.destinationID);
      let day = location.estimatedLodgingCostPerDay * trip.duration;
      let travel = location.estimatedFlightCostPerPerson * trip.travelers;
      acc += (day + travel);
      return acc 
    },0)

    this.totalIncome = price * 0.1;
  }

  getTodaysTrips() {
    this.todaysTrips = this.trips.filter(trip => trip.date === this.date)
  }

  locateTrip(tripNum) {
    return this.newTrips.find(trip => trip.id === tripNum)
  }

  findUser(userName) {
    this.client = this.users.find(user => user.name === userName)
  }
}

export default Agent;