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
  let person;
  beforeEach(function () {
    customer = new Customer(data);
    person = {
      id: 34,
      name: "Jadyn Doyle"
      }
  });
  
  it('should be a function', function() {
    expect(Customer).to.be.a('function');
  });
  
  it('should create a new instance', function() {
    expect(customer).to.be.an.instanceOf(Customer);
  });

  it('should return a user when searched', function() {
    expect(customer.returnSearchedCustomers('Autumn Toy')).to.eql([ { id: 1, name: 'Autumn Toy' } ]);
  });
    
  it('should return a new user when added', function () {
    expect(customer.createNewCustomer('Sergio Seplovich')).to.eql({id: 101, name: 'Sergio Seplovich', clicked: false});
    expect(customer.data.userData.users.length).to.equal(101);
  });

  it('should return breakdown of orders', function() {
    expect(customer.roomServiceAndOrderBreakdown('Jannie VonRueden')).to.be.an('array');
  });

  it('should find total room service charges by date', function() {
    expect(customer.totalCostOfRoomServiceByDate("16/01/2020", 'Jannie VonRueden')).to.be.a('number');
  });

  it('should caluculate total room service charges by date', function() {
    expect(customer.totalCostOfRoomServiceByDate("21/10/2019", person)).to.equal(7.57);

  })

  it('should return total room service charges over all time', function() {
    expect(customer.totalAmountOfRoomServiceAllTime('Jannie VonRueden')).to.equal(0);
  });

  it('should return a summary of all reservations', function() {
    expect(customer.sumOfPastAndCurrentBookings('Jannie VonRueden')).to.eql([])
  });


  
});
