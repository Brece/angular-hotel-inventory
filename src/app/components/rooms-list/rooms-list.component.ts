import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoomList } from '../rooms/room';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent implements OnInit {

  @Input() roomList: RoomList[] = [];
  @Output() selectedRoom = new EventEmitter<RoomList>();

  constructor() { }

  ngOnInit(): void {
  }

  selectRoom(room: RoomList) {
    this.selectedRoom.emit(room);
  }
}
