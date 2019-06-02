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
        $('.customers').text($('.name').val());
    }, 

    showMostPopularDate(date) {
        $('#tab-3').append(`Most popular booking date(s): ${date} `);
    },

    findCustomers(customer) {
        $('.customers').html('');
        let search = $('.searchCustomers').val();
        customer.returnSearchedCustomers(search).forEach(cust => {
          $('.customers').prepend(`
            <div class="newCust">
              <p>Name: <span class="newCustName">${cust.name}</span></p>
            </div>
          `);
        });
      },

    
}

export default domUpdates;