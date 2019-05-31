

class OrderRepository {
    constructor(data) {
        this.data = data;
    }
    returnUserRoomService(id) {
        const userData = this.data.roomServiceData.roomServices.filter(order => order.userID === id);
        return new Order(userData);
    }

    returnAllDailyRoomService(givenDate) {
        return this.data.roomServiceData.roomServices.filter(day => day.date === givenDate);
    }

}

export default OrderRepository;