import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shops-list',
  templateUrl: './shops-list.component.html',
  styleUrls: ['./shops-list.component.css']
})
export class ShopsListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


   openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
   closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
}
