import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  // create its own service instance instead of using the global one !!!
  providers: [RoomsService]
})
export class EmployeeComponent implements OnInit {

  employeeName: string = 'John Doe';
  
  constructor() { }

  ngOnInit(): void {
  }

}
