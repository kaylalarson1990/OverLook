// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
import MainRepository from './Main-Repo.js';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import fetch from 'cross-fetch';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/bell.svg'
import './images/bellboy.svg'
import './images/keycard.svg'
import './images/search.svg'
import './Main-Repo.js'

let dataFile1 = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/users/users').then(function(response){
    return response.json()});
 let dataFile2 = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/room-services/roomServices').then(function(response){
    return response.json()});
 let dataFile3 = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/bookings/bookings').then(function(response){
    return response.json()});
 let dataFile4 = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/rooms/rooms').then(function(response){
    return response.json()});
let combinedData = {'dataFile1':{}, 'dataFile2':{}, 'dataFile3':{}, 'dataFile4':{}}

Promise.all([dataFile1, dataFile2, dataFile3, dataFile4])
    .then(function(values) {
        combinedData['dataFile1'] = values[0];
        console.log('1', combinedData.dataFile1.users)
        combinedData['dataFile2'] = values[1];
        console.log('2', combinedData.dataFile2.roomServices)
        combinedData['dataFile3'] = values[2];
        console.log('3', combinedData.dataFile3.bookings)
        combinedData['dataFile4'] = values[3];
        console.log('4', combinedData.dataFile4.rooms)

        return combinedData;
    })

    // console.log('data', data)
    // console.log(this.data.dataFile2)


    let mainRepo = new MainRepository(combinedData);
    mainRepo.testData();

    console.log('dataFiles', dataFile1)

