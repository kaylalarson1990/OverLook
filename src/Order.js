import data from './data.js';

class Order {
  constructor(combinedData) {
    this.data = combinedData || data;
    this.currentDate = this.showTodaysDate();
  }

  showTodaysDate() {
    let today = new Date();
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let dd = String(today.getDate()).padStart(2, '0');
    let yyyy = today.getFullYear();
    return today = dd + '/' + mm + '/' + yyyy;
  }

  returnAllRoomServices() {
    return this.data.roomServiceData.roomServices.filter(room => {
      if (this.currentDate === room.date) {
        return room;
      }
    });
  }
    
  returnDailyTotalSpent(date) {
    const forThisDate = this.data.roomServiceData.roomServices.filter(day => day.date === date);
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

  returnRoomServicesByDate(givenDate) {
    return this.data.roomServiceData.roomServices.filter(day => day.date === givenDate);
  }    
}

export default Order;