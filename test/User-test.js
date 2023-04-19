import chai from 'chai';
const expect = chai.expect;
import User from '../src/User.js';
import trips from '../data/trips-test-data.js';
import travelers from '../data/user-test-data.js';

describe('User', () => {

  beforeEach(() => {
    let users = travelers.travelers;
    let user = new User(users[0]);
    let user2 = new User(users[1]);
    let userTrips = trips.trips.filter(trip => trip.userID === 1);
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it.skip('should be an instance of User', () => {
    expect(user).to.be.instanceof(User);
  });

  it.skip('should have an id', () => {
    expect(user.id).to.equal(1)
  });

  it.skip('should have a name', () => {
    expect(user.name).to.equal("Ham Leadbeater")
  });

  it.skip('should have a default property of traveled', () => {
    expect(user.traveled).to.equal(undefined);
  });

  it.skip('should have a property of totalCost with an initial value', () => {
    expect(user.totalCost).to.equal(0)
  });

  it.skip('should have a default property of destinations', () => {
    expect(user.destinations).to.equal(undefined);
  });

  it.skip('should have a method of to find past trips', () => {
    user.findTrips();
    expect(user.traveled).to.deep.equal(userTrips)
  });

  it.skip('should not return error if there are no trips', () => {
    expect(user.findTrips()).to.equal("You have not taken any trips.")
  });

  it.skip('should hava a method to retrieve total cost', () => {
    user.getTotalCost("2022");
    expect(user.totalCost).to.equal(12782);
    user2.getTotalCost("2022");
    expect(user.totalCost).to.equal(6270)
  })

  it.skip('should hava return error if no trips have been taken', () => {
    expect(user.getTotalCost("2023")).to.equal("You have not taken any trips yet this year.");
  });

  it.skip('should hava a method to retrieve upcoming trips', () => {
    let futureTrip = {
      id: 6,
      userID: 2,
      destinationID: 6,
      travelers: 3,
      date: "2023/06/29",
      duration: 9,
      status: "approved",
      suggestedActivities: []
    };
    user2.getUpcomingTrips();
    expect(user2.destinations).to.equal(futureTrip)
  });

  it.skip('should return an error if there are no upcoming trips', () => {
    expect(user.getUpcomingTrips()).to.equal("You have no upcoming trips.")
  });

});