import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';


/** if a declared component is used inside a different module 
 * (here: HeaderComponent is used in RoomsComponent which is declared in RoomsModule)
 * you have to export the component in "exports"
*/
@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
