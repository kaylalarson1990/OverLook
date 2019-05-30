import domUpdates from './domUpdates.js'
import data from './data.js';


class MainRepository {
    constructor(combinedData) {
        this.data = combinedData || data;
        
    }

    testData() {
        console.log('data', this.data)
    }
}

export default MainRepository;