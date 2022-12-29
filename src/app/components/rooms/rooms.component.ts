import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './room';

import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';

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

  /** Instanciate a service by passing it as an argument to the constructor with the appropriate identifier 
   * 
   * never declare/instanciate a service like this:
   *    roomsService = new RoomsService();
   * 
   * get the data from the service in ngOnInit
   * 
   * @SkipSelf identifier skips the check of the existence of the service; removes it from the resolution tree
   *  usage: not necessary since Angular uses a "Bloom Filter" internally (which is alrealdy fast) to check if the service exists
  */
  constructor(@SkipSelf() private roomsService: RoomsService) { }

  ngOnInit(): void {
    /** undefined when @ViewChild(component, {static: false}) which is the default value
     * available AFTER the child is initialized => ngAfterViewInit
     * you can set {static: true} if the child component doesn't have asyncronous code !!!
    */
    // console.log("Header:", this.headerComponent);

    // this.roomList = this.roomsService.getRooms();
    this.roomsService.getRooms().subscribe(rooms => this.roomList = rooms);
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
      roomNumber: '4',
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
