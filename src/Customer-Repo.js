import domUpdates from './domUpdates.js'
import data from './data.js';

class CustomerRepository {
    constructor(data) {
        this.data = data;
    }

    searchForCustomer() {
        //UI will prompt to search for a current customer
        //or create a new customer
        //creating a new customer:
            //submit customers name
            //customer will automatically be selected
            //customer name will be displayed at the top of the page

            //if user does not exist, UI will stat an error
        console.log('customerdata', this.data.userData.users[0].name)
    }

    addNewCustomer() {

    }
}

export default CustomerRepository;