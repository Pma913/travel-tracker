import chai from 'chai';
const expect = chai.expect;
import Agent from '../src/Agent.js';
import trips from '../data/trips-test-data.js';
import travelers from '../data/user-test-data.js';
import destinations from '../data/destination-test-data.js';

describe('Agent', () => {
  let agent;
  let pending;
  let theseTrips;
  const setTrip = () => {
    let todaysDate = new Date().toJSON().slice(0, 10);
    let formatedDate = todaysDate.split('-').join('/');
    theseTrips[3].date = formatedDate;
  }
  beforeEach(() => {
    theseTrips = trips.trips;
    
    agent = new Agent(trips.trips, destinations.destinations, travelers.travelers);
    pending = [{
      id: 6,
      userID: 2,
      destinationID: 6,
      travelers: 3,
      date: "2023/06/29",
      duration: 9,
      status: "pending",
      suggestedActivities: []
    }]
  });
  it('should be a function', () => {
    expect(Agent).to.be.a('function');
  });

  it('should have default properties', () => {
    expect(agent.newTrips).to.equal(undefined);
    expect(agent.totalIncome).to.equal(undefined);
    expect(agent.todaysTrips).to.equal(undefined);
  });

  it('should have a method to set new trips', () => {
    agent.getTripRequests(theseTrips);
    expect(agent.newTrips).to.deep.equal(pending);
  });

  it('should have a method to set total income', () => {
    agent.getTotalIncome(theseTrips);
    expect(agent.totalIncome).to.equal(2062);
  });

  it('should have a method to set todays trips', () => {
    setTrip();
    agent.getTodaysTrips();
    expect(agent.todaysTrips).to.deep.equal([theseTrips[3]]);
  });

  it('should be able to locate a trip', () => {
    agent.getTripRequests(theseTrips);
    expect(agent.locateTrip(6)).to.equal(theseTrips[5]);
  });

  it('should have a method to get user class', () => {
    agent.findUser("Ham Leadbeater");
    expect(agent.client).to.equal(agent.users[0])
  });
})
