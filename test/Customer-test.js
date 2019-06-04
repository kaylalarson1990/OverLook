import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/Customer.js';
import domUpdates from '../src/domUpdates.js';
import spies from 'chai-spies';
chai.use(spies);
import data from '../src/data.js';

chai.spy.on(domUpdates, 'findCustomers', () => true);
chai.spy.on(domUpdates, 'addNewCustomer', () => true);


describe('Customer', function() {
    let customer;
    let testCust;
    beforeEach(function () {
        customer = new Customer(data);
        testCust = customer.returnSearchedCustomers('Jannie VonRueden')
    });
  
    it('should be a function', function() {
      expect(Customer).to.be.a('function');
    });
  
    it('should create a new instance', function() {
      expect(customer).to.be.an.instanceOf(Customer);
    });

    it('should return a user when searched', function() {
        expect(customer.searchCustomers('Autumn Toy')).to.be.an('object');
      });
    
    it.skip('should return a new user when added', function () {
      // customer.createNewCustomer();
      expect(customer.createNewCustomer('Sergio Seplovich')).to.equal('Sergio Seplovich');
      // expect(customer.data.customerData.users.length).to.equal(101);
    });

    it('should return breakdown of orders', function() {
      expect(customer.roomServiceAndOrderBreakdown(testCust)).to.eql({ '01/01/2020': [ 18.63 ] });
    });

    it('should find total room service charges by date', function() {
      expect(customer.totalCostOfRoomServiceByDate("01/01/2020", testCust)).to.equal(18.63);
    });

    it('should return total room service charges over all time', function() {
      expect(customer.totalAmountOfRoomServiceAllTime(testCust)).to.equal(18.63);
    });

    it('should return a summary of all reservations', function() {
      expect(customer.sumOfPastAndCurrentBookings(testCust)).to.eql({})
    })
  
  });
