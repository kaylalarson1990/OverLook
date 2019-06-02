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

let userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/users/users').then(function(response){
    return response.json()});
 let roomServiceData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/room-services/roomServices').then(function(response){
    return response.json()});
 let bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/bookings/bookings').then(function(response){
    return response.json()});
 let roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/rooms/rooms').then(function(response){
    return response.json()});
let combinedData = {userData:{}, roomServiceData:{}, bookingData:{}, roomData:{}}

Promise.all([userData, roomServiceData, bookingData, roomData])
    .then(function(values) {
        combinedData['userData'] = values[0];
        combinedData['roomServiceData'] = values[1];
        combinedData['bookingData'] = values[2];
        combinedData['roomData'] = values[3];
        return combinedData;
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
      
      domUpdates.showCurrentDate(mainRepo.showTodaysDate());
      domUpdates.roomsOccupiedPercentage(mainRepo.showPercentageOfRoomsOccupiedToday());
      domUpdates.availableRooms(mainRepo.showAvailableRooms());
      domUpdates.totalOwedForTodaysDate(mainRepo.calculateDebtsToday());
      domUpdates.showAllOrders(order.returnAllRoomServices());
      domUpdates.showMostPopularDate(bookings.mostPopularBookingDate());
      
      order.returnDailyTotalSpent('21/10/2019');
      orderRepo.returnAllDailyRoomService('21/10/2019');
      $('ul.tabs li').click(function(){
          var tab_id = $(this).attr('data-tab');
          $('ul.tabs li').removeClass('current');
          $('.tab-content').removeClass('current');
          $(this).addClass('current');
          $("#"+tab_id).addClass('current');
      });

      $('.addNewCustomer').click(function() {
        domUpdates.addNewCustomer(customer.createNewCustomer(`${name}`));
      });

    function searchCust() {
        if ($('.searchCustomers').val() !== '') {
        domUpdates.findCustomers(customer);
    }
  }
    $('.searchCustomers').on('click', searchCust);
    
    }, 500);
  });
