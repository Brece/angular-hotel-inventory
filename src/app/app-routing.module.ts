import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  { path: 'employee', component: EmployeeComponent },
  { path: 'login', component: LoginComponent },
  // lazy-loading rooms component and its children
  { path: 'rooms', loadChildren: () => import('./components/rooms/rooms.module').then(m => m.RoomsModule) },
  // configure lazy-loading using CLI: "ng generate module components/booking --route=booking --routing --module=app"
  { path: 'booking', loadChildren: () => import('./components/booking/booking.module').then(m => m.BookingModule) },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
