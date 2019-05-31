import chai from 'chai';
const expect = chai.expect;
import MainRepository from '../src/Main-Repo.js';
import spies from 'chai-spies';
chai.use(spies);
import data from '../src/data.js';

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

    it('should show today\'s date', function() {
      expect(mainRepo.showTodaysDate('05/30/2019')).to.equal('05/30/2019');
    });

    it('should find available rooms', function() {
      expect(mainRepo.showAvailableRooms).to.be.a('function')
    })
  
  });