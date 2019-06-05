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
  beforeEach(function () {
    customer = new Customer(data);
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
    
  it('should return a new user when added', function () {
    customer.createNewCustomer();
    expect(customer.createNewCustomer('Sergio Seplovich')).to.eql({id: 102, name: 'Sergio Seplovich', clicked: false});
    expect(customer.data.userData.users.length).to.equal(102);
  });

  it('should return breakdown of orders', function() {
    expect(customer.roomServiceAndOrderBreakdown('Jannie VonRueden')).to.eql([]);
  });

  it('should find total room service charges by date', function() {
    expect(customer.totalCostOfRoomServiceByDate("01/01/2020", 'Jannie VonRueden')).to.equal(0);
  });

  it('should return total room service charges over all time', function() {
    expect(customer.totalAmountOfRoomServiceAllTime('Jannie VonRueden')).to.equal(0);
  });

  it('should return a summary of all reservations', function() {
    expect(customer.sumOfPastAndCurrentBookings('Jannie VonRueden')).to.eql([])
  })
  
});
