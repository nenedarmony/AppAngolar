import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { allTypes } from '../class/type';
import { ShoppInMall } from '../class/shopInMall_tbl';
import { malls } from '../class/malls_tbl';
import { category } from '../class/category';

@Component({
  selector: 'app-all-categorys',
  templateUrl: './all-categorys.component.html',
  styleUrls: ['./all-categorys.component.css'],

})
export class AllCategorysComponent implements OnInit {
  typesArry = allTypes;
  lstShops: Array<ShoppInMall> = new Array<ShoppInMall>();
  latitude: number;
  selected_mall: malls;
  longitude: number;
  catcurrentLat: any;
  catcurrentLong: any;
  map: google.maps.Map;
  position: any;
  marker: any;
  lstMalls: Array<malls> = new Array<malls>();
  catecoryInMall: Array<boolean>
  inputValue: string = "";
  categoryService: category
  constructor() {
    this.catecoryInMall= Array<boolean>();
  }

  @Output() messageEvent = new EventEmitter<string>();
  show: boolean = false;
  ngOnInit(): void {
    this.show = true;
    // Create a map and center it on israel.
    const israel = { lat: 32.0127463274658, lng: 34.7789974668429 };
    this.findMe();

    this.map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {

        mapTypeControl: false,
        mapId: "c4829a478ddce469",
        zoom: 18,
        center: israel,
        minZoom: 8,
      } as google.maps.MapOptions
    );
    this.categoryService = new category(this.map);

  }
  findMe() {
    if (navigator.geolocation) {

      //getCurrentPosition() => get the curent position of the user 
      navigator.geolocation.getCurrentPosition((position) => {
        this.catcurrentLat = position.coords.latitude;
        this.catcurrentLong = position.coords.longitude;

        // now we save the position end Changes the center of the map to the given {@link LatLng}.
        const location = new google.maps.LatLng(this.catcurrentLat, this.catcurrentLong);
        this.map.panTo(location);

        // after centring the map we are put a marker on the current position 
        if (!this.marker) {
          this.marker = new google.maps.Marker({
            draggable: true,
            position: location,
            map: this.map,
            title: 'Got you!'
          });
        }
        else {
          this.marker.setPosition(location);
        }
        // the function dragedMarker() set the new position of the dragged marker 
        this.dragedMarker(this.marker)

      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }

  }

  dragedMarker(marker) {

    //we add a eventListener so that whene the marker is dragged its position is seved 
    //and at the same time the nearbySearch for the mall is updated
    google.maps.event.addListener(marker, 'dragend', () => {
      this.catcurrentLat = marker.position.lat();
      this.catcurrentLong = marker.position.lng();

      // Create the places service.
      let service = new google.maps.places.PlacesService(this.map);

      // Perform a nearby search to find all the mall in the given radius
      service.nearbySearch(
        { location: { lat: this.catcurrentLat, lng: this.catcurrentLong }, radius: 5000, type: "shopping_mall" },
        (
          results: google.maps.places.PlaceResult[] | null,
          status: google.maps.places.PlacesServiceStatus

        ) => {
          if (status !== "OK" || !results) return;
          if (this.lstMalls) this.lstMalls.splice(0, this.lstMalls.length)

          results.forEach(sm =>
            this.lstMalls.push({
              MallID: sm.place_id, MallName: sm.name,
              CurentLang: sm.geometry.location.lng(),
              CurentLat: sm.geometry.location.lat(), vicinity: sm.vicinity
            }))

        }

      )
    });
  }

  searchMall(event) {

    this.selected_mall = this.lstMalls.find(m => m.MallName.trim() == event.trim())
    if (this.selected_mall != undefined) {
      this.categoryService.deletMarkers();
      let potision = new google.maps.LatLng(this.selected_mall.CurentLat, this.selected_mall.CurentLang);
      this.map.panTo(potision);
      this.map.setZoom(18);
      this.marker.setPosition(potision);
      // this.showCategory();
    }
  }

  // myFunction() {
  //   var input, filter, ul, li, a, i;
  //   input = document.getElementById("mySearch");
  //   filter = input.value.toUpperCase();
  //   ul = document.getElementById("myMenu");
  //   li = ul.getElementsByTagName("li");
  //   for (i = 0; i < li.length; i++) {
  //     a = li[i].getElementsByTagName("a")[0];
  //     if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
  //       li[i].style.display = "";
  //     }
  //     else {
  //       li[i].style.display = "none";
  //     }
  //   }
  // }
  showCategory() {
    for (let i = 0; i < this.typesArry.length; i++) {
      this.categoryService.findategory(this.selected_mall, allTypes[i])
    }
   const catecoryInMall = this.categoryService.getMarker();
    // console.log(this.catecoryInMall);
  for (let index = 0; index < this.typesArry.length; index++) {
   this.typesArry[index].isInMall=this.catecoryInMall[index];
    
  }
  

    let ul, li, i
    ul = document.getElementsByClassName("list-group")[0];
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length - 1; i++) {
      if (catecoryInMall[i] == true)
        li[i].style.display = "";
      else
        li[i].style.display = "none";

    }
    li[i].style.display = "";
  }


  type(item: any) {
    if (item.selected == undefined || item.selected == false) {
      item.selected = true
      if (this.selected_mall != undefined) {
        this.categoryService.findategory(this.selected_mall, item)
      }
    }
    else {
      if (item.selected == undefined || item.selected != false) {
        item.selected = false;
        this.categoryService.removAll(item)
      }

    }




  }


}

