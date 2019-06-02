import domUpdates from './domUpdates.js'
import $ from 'jquery';
import data from './data.js';

class Customer {
    constructor(confirmedData) {
        this.data = confirmedData || data;
        this.customers = [];
    }

    searchCustomers(name) {
        return this.data.userData.users.find(cust => cust.name === name);
    }
    
    returnSearchedCustomers(val) {
        return this.data.userData.users.filter(cust => cust.name.toLowerCase().includes(val.toLowerCase()));
    }
    
    createNewCustomer(name) {
        const ids = this.data.userData.users.map(cust => cust.id);
        const newCust = { id: Math.max(...ids) + 1, name: $('.name').val() };
        this.data.userData.users.push(newCust);
        console.log(newCust)
        return newCust;
    }

    // getCustomerSpecificData(name) {
    //     if(name ===)
    // }
}

export default Customer;