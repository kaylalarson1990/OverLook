import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/Customer.js';
import domUpdates from '../src/domUpdates.js';
import spies from 'chai-spies';
chai.use(spies);
import data from '../src/data.js';

chai.spy.on(domUpdates, 'findCustomers', () => true);
chai.spy.on(domUpdates, 'addNewCustomer', () => true);
chai.spy.on(Customer, 'createNewCustomer', () => true);


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
        customer.searchCustomers();
        expect(customer.searchCustomers('Autumn Toy')).to.be.an('object');
      });
    
    it('should return a new user when added', function () {
      customer.createNewCustomer();
    //   expect(customer.createNewCustomer('Sergio Seplovich')).to.equal('Sergio Seplovich');
      expect(customer.data.customerData.users.length).to.equal(101);
    });
  
  });
