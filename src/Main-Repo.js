import data from './data.js';


class MainRepository {
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

  showAvailableRooms() {
    return this.data.bookingData.bookings.filter(room => room.date !== this.currentDate).length
  }
    
  calculateDebtsToday() {
    let debt = this.data.roomServiceData.roomServices.reduce((room, service) => {
      if (service.date === this.currentDate) {
        room += service.totalCost;
      }
      return room;
    }, 0);
    let totalDebt = this.data.bookingData.bookings.reduce((totalBookings, currBooking) => {
      if (currBooking.date === this.currentDate) {
        totalBookings.push(currBooking.roomNumber);
      }
      return totalBookings;
    }, []);
    let charges = totalDebt.reduce((total, roomNum) => {
      this.data.roomData.rooms.forEach(room => {
        if (roomNum === room.number) {
          total += room.costPerNight;
        }
      });
      return total;
    }, 0);
    const final = Number(debt + charges).toFixed(2);
    return parseFloat(final);
  }

  showPercentageOfRoomsOccupiedToday() {
    let percentageOfBookings = this.data.bookingData.bookings.reduce((roomNums, booking) => {
      if (booking.date === this.currentDate) {
        roomNums.push(booking);
      }
      return roomNums;
    }, []);
    return percentageOfBookings.reduce((emptyRooms, booking) => {
      this.data.roomData.rooms.forEach(room => {
        if (booking.roomNumber === room.number) {
          emptyRooms.push(room);
        }
      });
      return emptyRooms;
    }, []).length / this.data.roomData.rooms.length * 100;
  }

}

export default MainRepository;