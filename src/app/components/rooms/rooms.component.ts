import { Component, OnInit } from '@angular/core';
import { Room, RoomList } from './room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  hotelName = 'Hilton Hotel';
  numberOfRooms = 350;
  hideRooms = true;
  rooms: Room = {
    totalRooms: 55,
    availableRooms: 32,
    bookedRooms: 23
  };
  roomList: RoomList[] = [];
  selectedRoom!: RoomList;

  constructor() { }

  ngOnInit(): void {
    this.roomList = [
      {
        roomType: 'Deluxe Room',
        roomNumber: 1,
        amenities: 'Air Condition, Free Wi-Fi, Kitchen, Bathroom',
        price: 999,
        photos: '/rooms/room-1.jpg',
        checkinTime: new Date('11-Nov-2022'),
        checkoutTime: new Date('11-Dez-2022'),
        rating: 4.6252,
      },
      {
        roomType: 'Normal Room',
        roomNumber: 2,
        amenities: 'Air Condition, Free Wi-Fi, Kitchen, Bathroom',
        price: 470,
        photos: '/rooms/room-2.jpg',
        checkinTime: new Date('01-Sep-2022'),
        checkoutTime: new Date('25-Okt-2022'),
        rating: 4.245,
      },
      {
        roomType: 'Limited Room',
        roomNumber: 3,
        amenities: 'Air Condition, Free Wi-Fi, Kitchen, Bathroom',
        price: 640,
        photos: '/rooms/room-3.jpg',
        checkinTime: new Date('01-Jan-2022'),
        checkoutTime: new Date('30-Dez-2022'),
        rating: 4.8,
      },
    ];
  }

  toggle(): void {
    this.hideRooms = !this.hideRooms;
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }
}
