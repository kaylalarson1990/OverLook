import $ from 'jquery';
import MainRepository from './Main-Repo.js'

let domUpdates = {

    showCurrentDate(date) {
        $('.currentDate').append(`Today\'s date: ${date}`);
    },

    showAllOrders(order) {
        order.forEach(a => {
            $('#tab-4').append(` Food: ${a.food}, Price: ${a.totalCost}, Date: ${a.date} `);
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
        $('#tab-3').prepend(`<p class='popData'>Most popular booking date: ${date}</p>`);
    },

    showLeastPopularDate(date) {
        $('#tab-3').prepend(`<p class='unpopData'>Least popular booking date: ${date}</p>`)
    },

    showRoomsBookedForDate(date) {
        $('#tab-3').prepend(`<p class=popData>Room numbers booked for today: ${date}</p>`)
    },

    findCustomers(customer) {
        $('.customers').html('');
        let search = $('.searchCustomersInput').val();
        customer.returnSearchedCustomers(search).forEach(cust => {
          $('.customers').prepend(`<p>Name: <span class="newCustName">${cust.name}</span></p>`);
        });
      },

      customerOrders(customer) {
          console.log(customer)
          customer.forEach(property => {
            $('.custOrder').append(`Name: ${property.food}`)
          })
          
      }
    
}

export default domUpdates;