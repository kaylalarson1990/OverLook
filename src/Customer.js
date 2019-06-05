import domUpdates from './domUpdates.js'
import $ from 'jquery';
import data from './data.js';

class Customer {
  constructor(confirmedData) {
    this.data = confirmedData || data;
    this.customers = [];
  }

  searchCustomers(name) {
    return this.data.userData.users.find(cust => cust.name === name);
  }
    
  returnSearchedCustomers(val) {
    return this.data.userData.users.filter(cust => cust.name.toLowerCase().includes(val.toLowerCase()));
  }
    
  createNewCustomer(name) {
    let ids = this.data.userData.users.map(cust => cust.id);
    let newCust = { id: Math.max(...ids) + 1, name, clicked: false };
    console.log(newCust)
    this.data.userData.users.push(newCust);
    return newCust;
  }

  roomServiceAndOrderBreakdown(customer) {
    let orders = this.data.roomServiceData.roomServices.filter(item => item.userID === customer.id);
    console.log('cust1', customer)
    console.log('cust2', orders)
    return orders;
  }

  totalCostOfRoomServiceByDate(date, customer) {
    let orders = this.data.roomServiceData.roomServices.filter(item => item.userID === customer.id);
    let specificDate = orders.filter(item => item.date === date);
    return specificDate.reduce((total, order) => {
      total += order.totalCost;
      return total;
    }, 0);
  }

  totalAmountOfRoomServiceAllTime(customer) {
    let orders = this.data.roomServiceData.roomServices.filter(item => item.userID === customer.id);
    return orders.reduce((total, order) => {
      total += order.totalCost;
      return total;
    }, 0);
  }

  sumOfPastAndCurrentBookings(cust) {
    let totalBookings = this.data.bookingData.bookings.filter(item => item.userID === cust.id);
    return totalBookings
  }

}

export default Customer;