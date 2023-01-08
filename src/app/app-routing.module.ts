import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RoomsAddComponent } from './components/rooms-add/rooms-add.component';
import { RoomsBookingComponent } from './components/rooms-booking/rooms-booking.component';
import { RoomsComponent } from './components/rooms/rooms.component';

const routes: Routes = [
  { path: 'employee', component: EmployeeComponent },
  { path: 'rooms/add', component: RoomsAddComponent },
  { path: 'rooms/:id', component: RoomsBookingComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
