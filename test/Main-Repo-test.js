import chai from 'chai';
const expect = chai.expect;
import MainRepository from '../src/Main-Repo.js';
import spies from 'chai-spies';
chai.use(spies);
import data from '../src/data.js'

describe('MainRepository', function() {
    let mainRepo;
    beforeEach(function () {
        mainRepo = new MainRepository(data);
    });
  
    it('should be a function', function() {
      expect(MainRepository).to.be.a('function');
    });
  
    it('should create a new instance', function() {
      expect(mainRepo).to.be.an.instanceOf(MainRepository);
    });
    
    it('should use test data', function() {
        mainRepo.testData();
        expect(mainRepo.testData()).to.equal(undefined)
    })
  
  });