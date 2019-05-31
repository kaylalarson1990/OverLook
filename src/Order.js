import data from './data.js';

class Order {
    constructor(data) {
        this.data = data;
    }

    returnAllRoomServices() {
        return this.data.roomServiceData.roomServices;
      }
    
      returnDailyTotalSpent(givenDate) {
        console.log(this.data.roomServiceData.roomServices)
        const forThisDate = this.data.roomServiceData.roomServices.filter(day => day.date === givenDate);
        return Math.round(100 * forThisDate.reduce((sum, order) => {
          sum += order.totalCost;
          return sum;
        }, 0)) / 100;
      }
    
      returnAllTimeTotalSpent() {
        return Math.round(100 * this.data.roomServiceData.roomServices.reduce((sum, order) => {
          sum += order.totalCost;
          return sum;
        }, 0)) / 100;
      }
}

export default Order;