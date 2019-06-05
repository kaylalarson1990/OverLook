import data from './data.js';
import Customer from './Customer.js'
import MainRepository from './Main-Repo.js'

class Bookings {
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

  filterRooms(date) {
    const rooms = this.data.bookingData.bookings.filter(room => {
      if(room.date !== date) {
        return room.roomNumber;
      }
    });
    const findRoom = rooms.map(room => room.roomNumber);
    return findRoom;
  }
      
  filterRoomsByDate(date, type) {
    const filteredRooms = this.filterRooms(date);
    const rooms = this.data.roomData.rooms.filter(room => !filteredRooms.includes(room.number));
    const final = rooms.filter(room => room.roomType === type);
    return final;
  }

  bookANewRoom(room) {
    const bookARoom = this.data.bookingData.bookings.push(room);
    console.log('room:', room)
    return bookARoom;
  }
}

export default Bookings;