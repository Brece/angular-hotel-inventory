import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss']
})
export class RoomsBookingComponent implements OnInit {

  id: string = '';

  // the difference with 'paramMap' is that you have 'get, has,...' methods to check if a property exists
  // id$ = this.router.params.pipe(map(params => params['id']));
  id$ = this.router.paramMap.pipe(map(params => params.get('id')));

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    // snapshot never updates the value; it returns the state at which it was created
    // this.id = this.router.snapshot.params['id'];

    // you shouldn't manually subscribe because it leads to memory leakage when you forget to unsubscribe
    // this.router.params.subscribe(params => this.id = params['id']);
  }

}
