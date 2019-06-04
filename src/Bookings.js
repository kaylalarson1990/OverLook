import data from './data.js';
import Customer from './Customer.js'
import MainRepository from './Main-Repo.js'

class Bookings {
    constructor(combinedData) {
        this.data = combinedData || data;
        this.currentDate = this.showTodaysDate();
        this.cust = new Customer();
    }

    showTodaysDate() {
        let today = new Date();
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let dd = String(today.getDate()).padStart(2, '0');
        let yyyy = today.getFullYear();
        return today = dd + '/' + mm + '/' + yyyy;
    }

    mostPopularBookingDate() {
        let filterDates = this.data.bookingData.bookings.reduce((acc, value) => {
            acc[value.date] = (acc[value.date] || 0) + 1;
            return acc;
        }, {});
        let maxCount = Math.max(...Object.values(filterDates));
        return Object.keys(filterDates).filter(bookingDate => filterDates[bookingDate] === maxCount).shift();
    }

    leastPopularBookingDate() {
      let filterDates = this.data.bookingData.bookings.reduce((acc, value) => {
        acc[value.date] = (acc[value.date] || 1);
        return acc;
      }, {});
      let maxCount = Math.min(...Object.values(filterDates));
      return Object.keys(filterDates).filter(bookingDate => filterDates[bookingDate] === maxCount).shift();
    }

    bookedRooms() {
        return this.data.bookingData.bookings.reduce((booked, current) => {
          if (current.date === this.currentDate) {
            booked.push(current.roomNumber);
          }
          return booked;
        }, []);
      }
}

export default Bookings;