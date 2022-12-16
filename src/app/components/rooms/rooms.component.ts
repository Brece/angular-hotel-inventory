import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './room';

import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked {

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
  title = 'Room List';

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  // {static: false} by default and cannot be changed!
  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;

  constructor() { }

  ngOnInit(): void {
    /** undefined when @ViewChild(component, {static: false}) which is the default value
     * available AFTER the child is initialized => ngAfterViewInit
     * you can set {static: true} if the child component doesn't have asyncronous code !!!
    */
    // console.log("Header:", this.headerComponent);

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

  ngAfterViewInit(): void {
    console.log("Header:", this.headerComponent);
    console.log("HeaderChildren:", this.headerChildrenComponent);

    this.headerComponent.title = "Rooms View";

    this.headerChildrenComponent.last.title = 'Last Component Title';
    // this.headerChildrenComponent.forEach(c => c.title = 'xxx');
  }

  ngAfterViewChecked(): void {
    
  }

  ngDoCheck(): void {
    // console.log('doCheck called');
  }

  toggle(): void {
    this.hideRooms = !this.hideRooms;
  }

  selectRoom(room: RoomList): void {
    this.selectedRoom = room;
  }

  addRoom(): void {
    const room: RoomList = {
      roomType: 'Royal Room',
      roomNumber: 4,
      amenities: 'Air Condition, Free Wi-Fi, Kitchen, Bathroom',
      price: 1499,
      photos: '/rooms/room-1.jpg',
      checkinTime: new Date('11-Nov-2022'),
      checkoutTime: new Date('11-Dez-2022'),
      rating: 4.866,
    };

    // after list update all properties that changed (here: title and displayed roomList in child component) on an event are listed in ngOnChange object
    this.title = 'Updated Room List';

    // return a new instance, current property is immutable !!!
    this.roomList = [...this.roomList, room];
  }
}
