import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  login() {
    if(this.email === 'admin@gmail.com' && this.password === 'admin') {
      alert('Login successful');

      /* manual redirect after a successful login;
        navigate takes an array of string and contructs a path based off it
        navigateByUrl takes a string as the final path
      */
      // this.route.navigate(['/rooms', 'add']);
      this.route.navigateByUrl('/rooms/add');
    }
  }
}
