import chai from 'chai';
const expect = chai.expect;
import CustomerRepository from '../src/Customer-Repo.js';
import spies from 'chai-spies';
chai.use(spies);
import data from '../src/data.js';

describe('CustomerRepository', function() {
    let customerRepo;
    beforeEach(function () {
        customerRepo = new CustomerRepository(data);
    });
  
    it('should be a function', function() {
      expect(CustomerRepository).to.be.a('function');
    });
  
    it('should create a new instance', function() {
      expect(customerRepo).to.be.an.instanceOf(CustomerRepository);
    });
  
  });