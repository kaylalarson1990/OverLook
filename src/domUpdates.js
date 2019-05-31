import $ from 'jquery';
import MainRepository from './Main-Repo.js'

let domUpdates = {

    showCurrentDate(date) {
        $('.mainContent').append(date).css({'font-family': 'Roboto', 'font-size': '28px', 'padding-left': '20px', 'font-weight': '300'});
    }

    
}

export default domUpdates;