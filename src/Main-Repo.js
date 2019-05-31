import domUpdates from './domUpdates.js'
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
        return today = mm + '/' + dd + '/' + yyyy;
    }

    searchForCustomers () {

    }

    showAvailableRooms() {
        let numOfRooms = this.data.bookingData.bookings.reduce((bookedRoomNum, currentBooking) => {
          if (currentBooking.date !== this.today) {
            if (!bookedRoomNum.includes(currentBooking.roomNumber)) {
              bookedRoomNum.push(currentBooking.roomNumber);
            }
          }
          return bookedRoomNum;
        }, []);
        return numOfRooms.reduce((allAvailableRooms, roomNum) => {
          this.data.roomData.rooms.forEach(room => {
            if (roomNum === room.number) {
              allAvailableRooms.push(room);
            }
          });
          return allAvailableRooms;
        }, []);
      }
    
      calculateDebtsToday() {
        let roomServiceDebt = this.data.roomServiceData.roomServices.reduce((roomsThatOwe, service) => {
          if (service.date === this.currentDate) {
            roomsThatOwe += service.totalCost;
          }
          return roomsThatOwe;
        }, 0);
        let roomsWithDebt = this.data.bookingData.bookings.reduce((totalBookings, currBooking) => {
          if (currBooking.date === this.currentDate) {
            totalBookings.push(currBooking.roomNumber);
          }
          return totalBookings;
        }, []);
        let roomCharges = roomsWithDebt.reduce((totalRoomCharges, roomNum) => {
          this.data.roomData.rooms.forEach(room => {
            if (roomNum === room.number) {
              totalRoomCharges += room.costPerNight;
            }
          });
          return totalRoomCharges;
        }, 0);
        return roomServiceDebt + roomCharges;
      }
    
      showRoomsOccupiedToday() {
        let todaysBookings = this.data.bookingData.bookings.reduce((roomNums, booking) => {
          if (booking.date === this.currentDate) {
            roomNums.push(booking);
          }
          return roomNums;
        }, []);
        return todaysBookings.reduce((freeRooms, booking) => {
          this.data.roomData.rooms.forEach(room => {
            if (booking.roomNumber === room.number) {
              freeRooms.push(room);
            }
          });
          return freeRooms;
        }, []);
    }
}

export default MainRepository;