import { AfterViewInit, Component, ElementRef, Inject, OnInit, Optional, ViewChild, ViewContainerRef } from '@angular/core';

import { RoomsComponent } from './components/rooms/rooms.component';
import { LoggerService } from './services/Logger/logger.service';
// import { setTheme } from 'ngx-bootstrap/utils';

import { LocalStorageToken } from './localstorage.token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit ,AfterViewInit {
  title = 'angular-hotel-inventory';
  role = 'Admin';

  constructor(
    @Optional() private loggerService: LoggerService,
    @Inject(LocalStorageToken) private localStorage: Storage
    ) {
    // setTheme('bs5');
  }

  // type ElementRef because it's a normal HTML tag element; accessable in ngOnInit because of {static: true}
  @ViewChild('wrapper', {static: true}) wrapper!: ElementRef;

  // {static: false}, default value so it's only available in ngAfterViewInit life cycle
  @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  ngAfterViewInit(): void {
    // creates the references instance dynamically
    const componentRef = this.vcr.createComponent(RoomsComponent);

    componentRef.instance.numberOfRooms = 50;
  }

  ngOnInit(): void {
    this.wrapper.nativeElement.innerText = 'Hotel Hilton';

    // "?" checks if loggerService is available, then executes the method
    // in this case it isn't registered in root or app.module.ts under providers, so log method doesn't get exucuted
    this.loggerService?.log('AppComponent.ngOnInit()')

    this.localStorage.setItem('name', 'Hilton Hotel');
  }

}
