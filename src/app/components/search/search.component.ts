import { Component, OnInit } from '@angular/core';

// creating components that doesn't need to be lazy-loaded using CLI:
// "ng generate module components/search" then,
// "ng generate component components/search"
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
