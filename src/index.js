import $ from 'jquery';
import MainRepository from './Main-Repo.js';
import Order from './Order.js';
import Bookings from './Bookings.js';
import Customer from './Customer.js';
import domUpdates from './domUpdates.js';
import './css/base.scss';
import fetch from 'cross-fetch';
import './images/bell.svg'
import './images/bellboy.svg'
import './images/keycard.svg'
import './images/search.svg'

const userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/users/users')
  .then(function(response) {
    return response.json()
  });
const roomServiceData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/room-services/roomServices')
  .then(function(response) {
    return response.json()
  });
const bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/bookings/bookings')
  .then(function(response) {
    return response.json()
  });
const roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/rooms/rooms')
  .then(function(response) {
    return response.json()
  });
const combinedData = {userData: [], roomServiceData: [], bookingData: [], roomData: []};

Promise.all([userData, roomServiceData, bookingData, roomData])
  .then(function(values) {
    combinedData.userData = values[0];
    combinedData.roomServiceData = values[1];
    combinedData.bookingData = values[2];
    combinedData.roomData = values[3];
    combinedData.userData.users.map(user => {
      user.clicked = false;
    })
  })
  .catch(error => console.log(`Error in promises ${error}`))

$( document ).ready(function() {
  setTimeout(function () {
    let mainRepo = new MainRepository(combinedData);
    let customer = new Customer(combinedData);
    let order = new Order(combinedData);
    let bookings = new Bookings(combinedData);
    mainRepo.showTodaysDate();
    order.returnDailyTotalSpent('21/10/2019');
    domUpdates.showRoomsBookedForDate(bookings.bookedRooms());
    domUpdates.showCurrentDate(mainRepo.showTodaysDate());
    domUpdates.roomsOccupiedPercentage(mainRepo.showPercentageOfRoomsOccupiedToday());
    domUpdates.availableRooms(mainRepo.showAvailableRooms());
    domUpdates.totalOwedForTodaysDate(mainRepo.calculateDebtsToday());
    domUpdates.showAllOrders(order.returnAllRoomServices());
    domUpdates.showMostPopularDate(bookings.mostPopularBookingDate());
    domUpdates.showLeastPopularDate(bookings.leastPopularBookingDate());

    $('ul.tabs li').click(function() {
      var tab_id = $(this).attr('data-tab');
      $('ul.tabs li').removeClass('current');
      $('.tab-content').removeClass('current');
      $(this).addClass('current');
      $("#" + tab_id).addClass('current');
    });

    $('.addNewCustomer').click(function() {
      domUpdates.addNewCustomer(customer.createNewCustomer($('.name').val()));
      $('.name').val('');
      $('.customers').html('');
    });

    $('.resSuite').click(function() {
      domUpdates.filterByRoomType(bookings.filterRooms('residential suite'))
      $('.bookRoom').on('click', function() {
        console.log(this.id)
      })
    });

    $('.single').click(function() {
      domUpdates.filterByRoomType(bookings.filterRooms('single room'))
    });

    $('.juniorSuite').click(function() {
      domUpdates.filterByRoomType(bookings.filterRooms('junior suite'))
    });

    $('.suite').click(function() {
      domUpdates.filterByRoomType(bookings.filterRooms('suite'))
    });

    function searchCust(e) {
      e.preventDefault();
      const cust = customer.returnSearchedCustomers($('.searchCustomersInput').val());
      if (cust.length !== 0) {
        domUpdates.findCustomers(customer);
      } else {
        domUpdates.searchCustError();
      }
      $('.newCustomers').html('');
    }

    $('.searchCustomers').on('click', searchCust);

   

    $('.customers').on('click', function() {
      const cust = customer.returnSearchedCustomers($('.searchCustomersInput').val())
      const changeClick = combinedData.userData.users.map(user => {
        if (user.id === cust[0].id) {
          user.clicked = true;            
        }
        return user;
      })
      combinedData.userData.users = changeClick;
      displayCustOrders();
    });
  }, 1000);
});

function displayCustOrders() {
  let customer = new Customer();
  const checkClick = combinedData.userData.users.find(user => {
    if (user.clicked) {
      domUpdates.customerOrders(customer.roomServiceAndOrderBreakdown(user));
      domUpdates.totalOrdersForDate(customer.totalCostOfRoomServiceByDate('21/10/2019', user));
      domUpdates.totalOrdersForAllTime(customer.totalAmountOfRoomServiceAllTime(user));
      domUpdates.showCustBookings(customer.sumOfPastAndCurrentBookings(user));
    }
  })
  return checkClick;
}

$('.orderSearch').on('click', searchOrdersByDate);

$('.customers').on('click', function() {
  domUpdates.showCustomer($('.newCustName').html())
})

function searchOrdersByDate(e) {
  e.preventDefault();
  const order = new Order();
  const searchOrder = order.returnRoomServicesByDate($('.searchOrderInput').val());
  if (searchOrder.length !== 0) {
    domUpdates.searchOrders(searchOrder);
  } else {
    domUpdates.searchOrderError();
  }
}