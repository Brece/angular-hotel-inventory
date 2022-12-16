import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges, OnDestroy } from '@angular/core';
import { RoomList } from '../rooms/room';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, //OnPush strategy because the data doesn't get updated in this component
})
export class RoomsListComponent implements OnInit, OnDestroy {

  @Input() roomList: RoomList[] = [];
  @Input() title: string = '';
  @Output() selectedRoom = new EventEmitter<RoomList>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

    if(changes['title'] && changes['title'].previousValue) {
      // title changed; not undefined
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  ngOnDestroy(): void {
    // can used to introduce some code to free up memory storage when the component gets destroyed
    // usually it's used to unsubscribe from services !!!
    console.log('onDestroy is called');
  }

  selectRoom(room: RoomList) {
    this.selectedRoom.emit(room);
  }
}
