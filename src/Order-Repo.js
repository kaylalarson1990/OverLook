import data from './data.js';

class OrderRepository {
    constructor(combinedData) {
        this.data = combinedData || data;
    }

    returnAllDailyRoomService(givenDate) {
        return this.data.roomServiceData.roomServices.filter(day => day.date === givenDate);
    }
}

export default OrderRepository;