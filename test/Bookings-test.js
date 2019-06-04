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
        expect(bookings.mostPopularBookingDate()).to.equal('21/08/2019')
    });

    it('should return the date with the least rooms booked', function() {
        expect(bookings.leastPopularBookingDate()).to.equal('21/08/2019')
    });
    
  
  });