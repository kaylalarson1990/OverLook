import chai from 'chai';
const expect = chai.expect;
import Order from '../src/Order.js';
import spies from 'chai-spies';
chai.use(spies);
import data from '../src/data.js';

describe('Order', function() {
  let order;
  beforeEach(function () {
    order = new Order(data);
  });
  
  it('should be a function', function() {
    expect(Order).to.be.a('function');
  });
  
  it('should create a new instance', function() {
    expect(order).to.be.an.instanceOf(Order);
  });

  it('should show today\'s date', function() {
    expect(order.showTodaysDate()).to.equal(order.showTodaysDate());
  });

  it('should expect to return room service costs by date', function() {
    expect(order.returnRoomServicesByDate("21/10/2019")).to.eql([ { userID: 34,
      date: '21/10/2019',
      food: 'Intelligent Metal Sandwich',
      totalCost: 7.57 } ]);
  });

  it('should find available rooms', function() {
    expect(order.returnAllRoomServices()).to.be.an('array');
    expect(order.returnAllRoomServices()).to.eql([ { userID: 34,
      date: '07/06/2019',
      food: 'Generic Plastic Sandwich',
      totalCost: 9.48 } ])
  });

  it('should return total spent by date', function() {
    expect(order.returnDailyTotalSpent('31/05/2019')).to.be.a('number');
  });

  it('should return total spent by date as a number', function() {
    expect(order.returnDailyTotalSpent("07/06/2019")).to.equal(9.48)
  });

  it('should return total spent over all time', function() {
    expect(order.returnAllTimeTotalSpent()).to.equal(1508.6);
  });

  it('should return total spent over all time as a number', function() {
    expect(order.returnAllTimeTotalSpent()).to.be.a('number')
  });

  it('should be able to add a new order', function() {
    expect(order.addANewOrder()).to.equal(101);
  });
});