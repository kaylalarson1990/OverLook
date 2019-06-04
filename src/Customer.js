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
        let newCust = { id: Math.max(...ids) + 1, name: $('.name').val(), clicked: false };
        this.data.userData.users.push(newCust);
        return newCust;
    }

    roomServiceAndOrderBreakdown(customer) {
        let orders = this.data.roomServiceData.roomServices.filter(item => item.userID === customer.id);
        console.log('orders', orders)
        return orders;
    }

    totalCostOfRoomServiceByDate(date, customer) {
        let cust = customer.find(item => item);
        let orders = this.data.roomServiceData.roomServices.filter(item => item.userID === cust.id);
        let specificDate = orders.filter(item => item.date === date);
        return specificDate.reduce((total, order) => {
            total += order.totalCost;
            return total;
        }, 0);
    }

    totalAmountOfRoomServiceAllTime(customer) {
        let cust = customer.find(item => item);
        let orders = this.data.roomServiceData.roomServices.filter(item => item.userID === cust.id);
        return orders.reduce((total, order) => {
            total += order.totalCost;
            return total;
        }, 0);
    }

    sumOfPastAndCurrentBookings(customer) {
        let cust = customer.find(item => item);
        let totalBookings = this.data.bookingData.bookings.filter(item => item.userID === cust.id);
        return totalBookings.reduce((date, booking) => {
            if(totalBookings.indexOf(booking.date) === totalBookings.indexOf(booking.totalCost)) {
                if(!date[booking.date]) {
                    date[booking.date] = booking.roomNumber;
                }
            }
            return date;
        }, {})
    }

}

export default Customer;