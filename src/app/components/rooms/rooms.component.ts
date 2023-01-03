import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './room';

import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { catchError, Observable, of, Subject, Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';

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
  stream = new Observable<string>(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    // observer.error('error');
  });
  totalBytes = 0;
  subscription!: Subscription;
  // Subject is an observable and observer
  error$ = new Subject<string>();
  getError$ = this.error$.asObservable();

  // how to automatically subscribe and unsubscribe a stream using async pipe (look in rooms.component.html)
  // errors that occurs in streams can be handled with "pipe" method; for demonstrating purposes the error handling is placed in the component, it should be done in the service file
  // you can create an error by changing the api url to one that doesn't exist in "rooms.service.ts" for getRooms$
  rooms$ = this.roomsService.getRooms$.pipe(
    catchError(err => {
      // console.log("Rooms Service stream error:", err);
      this.error$.next(err.message);
      return of([]);
    })
  );

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
    
    // get stream data from RxJS shareReplay that caches the response and shares it instead of doing a http request for every component 
    // this.roomsService.getRooms().subscribe(rooms => this.roomList = rooms);

    // manually subscribing to a stream (when not using "async pipe")
    // this.subscription = this.roomsService.getRooms$.subscribe(rooms => this.roomList = rooms);

    // data stream
    this.stream.subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log('stream error:', error),
      complete: () => console.log('stream complete')
    });

    // Fake JSON API request; subscribe to multiple returned events
    this.roomsService.getPhotos().subscribe(event => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Fake JSON API request has been made.');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Fake JSON API request success.');
          break;
        case HttpEventType.DownloadProgress:
          this.totalBytes += event.loaded;
          console.log('Total Bytes', this.totalBytes);
          break;
        case HttpEventType.Response:
          console.log(event.body);
      }
    });
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

  ngOnDestroy(): void {
    // unsubscribe and free up memory resources manually
    // not necessary when using async pipe to access the stream data
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
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
      roomNumber: '',
      amenities: 'Air Condition, Free Wi-Fi, Kitchen, Bathroom',
      price: 1499,
      photos: '/rooms/room-1.jpg',
      checkinTime: new Date('11-Nov-2022'),
      checkoutTime: new Date('11-Dec-2022'),
      rating: 4.866,
    };

    // after list update all properties that changed (here: title and displayed roomList in child component) on an event are listed in ngOnChange object
    this.title = 'Updated Room List';

    // return a new instance, current property is immutable !!!
    // this.roomList = [...this.roomList, room];

    // adds room to the database through API and assign a roomNumber (see room.service.ts in angular-hotel-inventory-api)
    this.roomsService.addRoom(room).subscribe(data => this.roomList = data);
  }

  editRoom(): void {
    const room: RoomList = {
      roomType: 'Royal Room',
      roomNumber: '3',
      amenities: 'Air Condition, Free Wi-Fi, Kitchen, Bathroom',
      price: 1499,
      photos: '/rooms/room-1.jpg',
      checkinTime: new Date('11-Nov-2022'),
      checkoutTime: new Date('11-Dec-2022'),
      rating: 4.866,
    };

    this.roomsService.editRoom(room).subscribe(data => this.roomList = data);
  }

  deleteRoom(id: string): void {
    this.roomsService.deleteRoom(id).subscribe(data => this.roomList = data);
  }
}
