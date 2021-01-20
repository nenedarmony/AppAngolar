import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'malLocationAngolarApp';
  show:boolean=true;
   navbar = document.getElementById("myTopnav");
   sticky = this.navbar.offsetTop;

  showme()
  {
    this.show=false;
  } 
   myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  } 

   stikyFunction() {
    if (window.pageYOffset >= this.sticky) {
      this.navbar.classList.add("sticky")
    } else {
      this.navbar.classList.remove("sticky");
    }
  }
}
