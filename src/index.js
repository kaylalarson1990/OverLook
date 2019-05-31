// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
import MainRepository from './Main-Repo.js';
import CustomerRepository from './Customer-Repo.js';
import domUpdates from './domUpdates.js';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import fetch from 'cross-fetch';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/bell.svg'
import './images/bellboy.svg'
import './images/keycard.svg'
import './images/search.svg'
import './Main-Repo.js'
import './Order-Repo.js'
import './Order.js'


import Order from './Order.js';
import OrderRepository from './Order-Repo.js';

let userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/users/users').then(function(response){
    return response.json()});
 let roomServiceData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/room-services/roomServices').then(function(response){
    return response.json()});
 let bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/bookings/bookings').then(function(response){
    return response.json()});
 let roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/rooms/rooms').then(function(response){
    return response.json()});
let combinedData = {'userData':{}, 'roomServiceData':{}, 'bookingData':{}, 'roomData':{}}
// let request;

Promise.all([userData, roomServiceData, bookingData, roomData])
    .then(function(values) {
        combinedData['userData'] = values[0];
        combinedData['roomServiceData'] = values[1];
        combinedData['bookingData'] = values[2];
        combinedData['roomData'] = values[3];
        return combinedData;
    })
    .catch(error => console.log(`Error in promises ${error}`))


    // if (window.XMLHttpRequest) {
    //     request = new XMLHttpRequest();
    //   } else if (window.ActiveXObject) {
    //     try {
    //       request = new ActiveXObject('Msxml2.XMLHTTP');
    //     } 
    //     catch (e) {
    //       try {
    //         request = new ActiveXObject('Microsoft.XMLHTTP');
    //       } 
    //       catch (e) {}
    //     }
    //   }

let mainRepo = new MainRepository(combinedData);
let customerRepo = new CustomerRepository(combinedData);
let order = new Order(combinedData);
let orderRepo = new OrderRepository(combinedData);

$(document).ready(() => {
    domUpdates.showCurrentDate(mainRepo.showTodaysDate());
    $('.button').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('.button').removeClass('current');
		$('.content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})
});

    


function timer() {
    mainRepo.showTodaysDate();
    mainRepo.showAvailableRooms();
    customerRepo.searchForCustomer(); 
    order.returnDailyTotalSpent('21/10/2019');
    orderRepo.returnAllDailyRoomService('21/10/2019');
}

setTimeout(timer, 2000);
