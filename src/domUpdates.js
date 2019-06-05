import $ from 'jquery';
import MainRepository from './Main-Repo.js'

let domUpdates = {

    showCurrentDate(date) {
        $('.currentDate').append(`Today\'s date: ${date}`);
    },

    showAllOrders(order) {
        order.forEach(a => {
            $('#tab-4').append(` <p class="todaysOrders">Food: ${a.food}, Price: ${a.totalCost}, Date: ${a.date} </p>`);
        })
    },

    roomsOccupiedPercentage(total) {
        $('.showPercentageRooms').append(`Percentage of rooms occupied today: ${total}% `);
    },

    availableRooms(rooms) {
        $('.showAvailableRooms').append(`Available number of rooms today: ${rooms} `);
    },

    totalOwedForTodaysDate(price) {
        $('.totalOwed').append(`Total debts owed/earned: ${price} `);
    },

    addNewCustomer() {
        $('.newCustomers').text($('.name').val());
    }, 

    showMostPopularDate(date) {
        $('.popData1').prepend(`Most popular booking date: ${date}`);
    },

    showLeastPopularDate(date) {
        $('.unPopData').prepend(`Least popular booking date: ${date}`)
    },

    showRoomsBookedForDate(date) {
        $('.popData2').prepend(`Room numbers booked for today: ${date}`)
    },

    findCustomers(customer) {
        $('.customers').html('');
        let search = $('.searchCustomersInput').val();
        customer.returnSearchedCustomers(search).forEach(cust => {
          $('.customers').prepend(`<p>Name: <span class="newCustName">${cust.name}</span></p>`);
        });
      },

      searchCustError() {
        $('.customers').html('');
        $('.customers').prepend(`<p>No results. Please add a new guest</p>`);
      },

      searchOrderError() {
        $('.custSearchOrder').html('');
        $('.todaysOrders').html('');
        $('.custSearchOrder').prepend(`<p>No orders match this date.</p>`);
      },

      showCustomer(name) {
        $('.showCustomer').html('');
        $('.showCustomer').append(`Customer selected: ${name}`)
      },

    customerOrders(customer) {
          customer.forEach(property => {
            $('.todaysOrders').html('');
            $('.custOrder').append(` <p class="custOrderInfo">Date ordered: ${property.date}, Total cost: ${property.totalCost}</p> `);
          })
      },

      searchOrders(order) {
        $('.custSearchOrder').html('');
        $('.todaysOrders').html('');
          order.forEach(date => {
            $('.custSearchOrder').append(` Food ordered: ${date.food}`)
          }) 
      },

    totalOrdersForDate(cost) {
        $('.todaysOrders').html('');
        $('.custOrder').append(` <p class="custOrderInfo">Total for date: ${cost}</p> `);
    },

    totalOrdersForAllTime(cost) {
        $('.todaysOrders').html('');
        $('.custOrder').append(` <p class="custOrderInfo">Total spent for all time: ${cost}</p> `);
    },

    showCustBookings(booking) {
        $('.popData1').html('');
        $('.unPopData').html('');
        $('.popData2').html('');
      booking.forEach(user => {
        $('.custPopData').append(` Booking Info: Date: ${user.date} & Room num: ${user.roomNumber} `);
      })
    },

    filterByRoomType(suites) {
        $('.filteredRoom').html('');
        $('.popData1').html('');
        $('.unPopData').html('');
        $('.popData2').html('');
        suites.forEach(room => {
            $('.filteredRoom').append(`
            <table>
            <tr>
            <th>Room Type</th>
            <th>Bidet Avail</th>
            <th>Bed Size</th>
            <th>Num of Beds</th>
            <th>Cost</th>
            <th>Book Room</th>
            </tr>
            <tr>
            <td>${room.roomType}</td>
            <td>${room.bidet}</td>
            <td>${room.bedSize}</td>
            <td>${room.numBeds}</td>
            <td>${room.costPerNight}</td>
            <td><button class="bookRoom">Book Room</button>
            </tr> `)
        })
    }

    
}

export default domUpdates;