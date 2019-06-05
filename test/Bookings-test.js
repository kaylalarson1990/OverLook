import chai from 'chai';
const expect = chai.expect;
import Bookings from '../src/Bookings.js';
import spies from 'chai-spies';
chai.use(spies);
import data from '../src/data.js';

describe('Bookings', function() {
  let bookings;
  beforeEach(function () {
    bookings = new Bookings(data);
  });
  
  it('should be a function', function() {
    expect(Bookings).to.be.a('function');
  });
  
  it('should create a new instance', function() {
    expect(bookings).to.be.an.instanceOf(Bookings);
  });

  it('should return the date with the most rooms booked', function() {
    expect(bookings.mostPopularBookingDate()).to.equal('29/09/2019')
  });

  it('should return the date with the least rooms booked', function() {
    expect(bookings.leastPopularBookingDate()).to.equal('21/08/2019')
  });

  it('should be able to filter rooms by type', function() {
    expect(bookings.filterRooms('suite')).to.be.an('array');
  });

  it('should find length of filter rooms by type', function() {
    expect(bookings.filterRooms('21/10/2019')).to.be.an('array');
    expect(bookings.filterRooms('21/10/2019').length).to.equal(0);
  });

  it('should be able to filter rooms by date and type', function() {
    expect(bookings.filterRoomsByDate('21/08/2019', 'suite')).to.be.an('array');
  });

  it('should be able to book a new room', function() {
    bookings.bookANewRoom({
      userID: 78,
      date: "20/06/2019",
      roomNumber: 143
      })
    expect(bookings.data.bookingData.bookings.length).to.equal(201)
  })
});