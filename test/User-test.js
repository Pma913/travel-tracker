import chai from 'chai';
const expect = chai.expect;
import User from '../src/User.js';
import trips from '../data/trips-test-data.js';
import travelers from '../data/user-test-data.js';
import destinations from '../data/destination-test-data.js';
import userItinerary from '../data/combined-travel-data.js';

describe('User', () => {

  let user;
  let user2;
  let user3;
  let users;
  let userTrips;
  let allTrips;
  let travelLocations;
  let userTravelLocations;
  let itinerary;

  beforeEach(() => {
    users = travelers.travelers;
    user = new User(users[0]);
    user2 = new User(users[1]);
    user3 = new User(users[2]);
    userTrips = trips.trips.filter(trip => trip.userID === 1);
    allTrips = trips.trips;
    travelLocations = destinations.destinations;
    userTravelLocations = travelLocations.filter(dest => {
      return dest.id === 1 || dest.id === 3 || dest.id === 5;
    });
    itinerary = userItinerary.userItinerary
    user.findTrips(allTrips);
    user2.findTrips(allTrips);
    user.addItineraries(travelLocations);
    user2.addItineraries(travelLocations);
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', () => {
    expect(user).to.be.instanceof(User);
  });

  it('should have an id', () => {
    expect(user.id).to.equal(1)
  });

  it('should have a name', () => {
    expect(user.name).to.equal("Ham Leadbeater")
  });

  it('should have a property of totalCost with an initial value', () => {
    expect(user.totalCost).to.equal(0)
  });

  it('should have a default property of destinations', () => {
    expect(user.destinations).to.equal(undefined);
  });

  it('should have a method of to find past trips', () => {
    expect(user.tripData).to.deep.equal(userTrips)
  });

  it('should return error if there are no trips', () => {
    expect(user3.findTrips(allTrips)).to.equal("You have not taken any trips.")
  });

  it('should have a method to add trip itineraries', () => {
    expect(user.tripData).to.deep.equal(itinerary)
  });
  
  it('should return error if no trip itineraries', () => {
    expect(user3.findTrips(travelLocations)).to.equal("You have not taken any trips.")
  });

  it('should hava a method to retrieve total cost', () => {
    user2.getTotalCost();
    expect(user2.totalCost).to.equal(5115)
  })

  it('should hava return error if no trips have been taken', () => {
    expect(user.getTotalCost()).to.equal("You have not taken any trips yet this year.");
  });

  it('should hava a method to retrieve upcoming trips', () => {
    let upcoming = allTrips[3];
    
    upcoming.itinerary = travelLocations[3];
    user2.getApprovedTrips();
    expect(user2.approved).to.deep.equal([upcoming])
  });

  it('should return an error if there are no upcoming trips', () => {
    expect(user.getApprovedTrips()).to.equal("You have no upcoming trips.")
  });

});