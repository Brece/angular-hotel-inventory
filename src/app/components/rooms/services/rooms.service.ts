import { Inject, Injectable } from '@angular/core';
import { RoomList } from '../room';
import { environment } from 'src/environments/environment';
import { APP_SERVICE_CONFIG } from 'src/app/services/AppConfig/appconfig.service';
import { AppConfig } from 'src/app/services/AppConfig/appconfig.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  /** 'root' means it gets registered in app.module.ts in 'providers' for us as a SINGLE global instance that can be used across the application
   * 
   * to use and create a new service instance you can pass the service as a value of the 'providers' property in the components decorator:
   * providers: [NameService]
   */
  providedIn: 'root'
})
export class RoomsService {
  // move component logic into a service

  // hard coded database
  /* 
  roomList: RoomList[] = [
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
  */

  // database from backend server
  roomList: RoomList[] = [];

  /**
   * @Inject as a value provider from a service (appconfig.service.ts) instead of accessing the value directly from the environment file 
   */
  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient
    ) {
      console.log('Rooms Service initialized...');
      console.log('Environment:', this.config.apiEndpoint);
      // console.log('Environment:', environment.apiEndpoint);
  }

  getRooms() {
    // get from hardcoded database
    // return this.roomList;

    // get from backend API (proxy.config.json sets up the API source); transform data object into "RoomList[]" type
    return this.http.get<RoomList[]>('./api/rooms');
  }
}