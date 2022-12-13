export interface Room {
    totalRooms: number,
    availableRooms?: number, // optional, see how it can be checked in the HTML
    bookedRooms: number,
}

export interface RoomList {
    roomType: string,
    roomNumber: number,
    amenities: string,
    price: number,
    photos: string,
    checkinTime: Date,
    checkoutTime: Date,
    rating: number,
}