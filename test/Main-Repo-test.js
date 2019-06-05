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
    expect(mainRepo.showTodaysDate('31/05/2019')).to.be.a('string');
  });

  it('should find available rooms', function() {
    expect(mainRepo.showAvailableRooms).to.be.a('function')
  });

  it('should find available rooms', function() {
    expect(mainRepo.showAvailableRooms('31/05/2019')).to.equal(10);
  });

  it('should show total debts as a number', function() {
    expect(mainRepo.calculateDebtsToday()).to.be.a('number');
  });

  it('should calculate total debts for today\'s date', function() {
    expect(mainRepo.calculateDebtsToday('21/10/2019')).to.equal(0);
  });

  it('should show percentage of rooms available as a number', function() {
    expect(mainRepo.showPercentageOfRoomsOccupiedToday()).to.be.a('number');
  });

  it('should calculate percentage of rooms available for today\'s date', function() {
    expect(mainRepo.showPercentageOfRoomsOccupiedToday('21/10/2019')).to.equal(0);
  });
  
});