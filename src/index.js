import $ from 'jquery';
import MainRepository from './Main-Repo.js';
import Order from './Order.js';
import Bookings from './Bookings.js';
import Customer from './Customer.js';
import OrderRepository from './Order-Repo.js';
import CustomerRepository from './Customer-Repo.js';
import domUpdates from './domUpdates.js';
import './css/base.scss';
import fetch from 'cross-fetch';
import './images/bell.svg'
import './images/bellboy.svg'
import './images/keycard.svg'
import './images/search.svg'
// import './Main-Repo.js'
// import './Order-Repo.js'
// import './Order.js'

const userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/users/users')
  .then(function(response){
    return response.json()
  });
const roomServiceData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/room-services/roomServices')
.then(function(response){
  return response.json()
});
const bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/bookings/bookings')
  .then(function(response){
    return response.json()
  });
const roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/rooms/rooms')
  .then(function(response){
    return response.json()
  });
const combinedData = {userData:[], roomServiceData:[], bookingData:[], roomData:[]};

console.log(combinedData)
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
      let customerRepo = new CustomerRepository(combinedData);
      let customer = new Customer(combinedData);
      let order = new Order(combinedData);
      let orderRepo = new OrderRepository(combinedData);
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
      orderRepo.returnAllDailyRoomService('21/10/2019');

      $('ul.tabs li').click(function(){
          var tab_id = $(this).attr('data-tab');
          $('ul.tabs li').removeClass('current');
          $('.tab-content').removeClass('current');
          $(this).addClass('current');
          $("#"+tab_id).addClass('current');
      });

      $('.addNewCustomer').click(function() {
        domUpdates.addNewCustomer(customer.createNewCustomer(name));
      });

    function searchCust(e) {
        e.preventDefault();
        if ($('.searchCustomersInput').val() !== '') {
        domUpdates.findCustomers(customer);
    }
  }
    $('.searchCustomers').on('click', searchCust);

    $('.customers').on('click', function() {
        let cust = customer.returnSearchedCustomers($('.searchCustomersInput').val())
        const changeClick = combinedData.userData.users.map(user => {
          if(user.id === cust[0].id) {
            user.clicked = true;            
          }
          return user;
        })

        combinedData.userData.users = changeClick
        displayCustOrders()
    });
    
    }, 500);
  });

function displayCustOrders() {
  console.log('hello1')
  let customer = new Customer();
  const checkClick = combinedData.userData.users.find(user => {
    if(user.clicked) {
      console.log('hello2')
      domUpdates.customerOrders(customer.roomServiceAndOrderBreakdown(user))
    }
  })
  return checkClick;
}