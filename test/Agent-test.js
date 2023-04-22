const expect = chai.expect;
import trips from '../data/trips-test-data.js';
import travelers from '../data/user-test-data.js';
import destinations from '../data/destination-test-data.js';
import userItinerary from '../data/combined-travel-data.js';

describe('Agent', () => {
  beforeEach(() => {
    agent = new Agent();
  });

  it.skip('should have default properties', () => {
    expect(agent.newTrips).to.equal(undefined);
    expect(agent.totalIncome).to.equal(undefined);
    expect(agent.todaysTrips).to.equal(undefined);
  });

  it.skip('should have a method to set new trips', () => {
    agent.getTripRequests();
    expect(agent.newTrips).to.deep.equal();
  });

  it.skip('should have a method to set total income', () => {
    agent.getTotalIncome();
    expect(agent.totalIncome).to.equal();
  });

  it.skip('should have a method to set todays trips', () => {
    agent.getTodaysTrips();
    expect(agent.todaysTrips).to.equal();
  });

  it.skip('should be able to approve a trip', () => {
    expect(agent.approveTrip(tripNumber)).to.equal();
  });

  it.skip('should be able to deny a trip', () => {
    agent.deleteTrip();
    expect(user.upcomingDestinations).to.deep.equal()
  });

  it.skip('should have a method to get user class', () => {
    agent.findUser("[name here]");
    expect(this.user).to.equal()
  });
})
