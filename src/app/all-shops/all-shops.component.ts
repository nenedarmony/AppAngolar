// import { } from 'googlemaps';
import { Component, Input, OnInit } from '@angular/core';
import { malls } from '../class/malls_tbl';
import { ShoppInMall } from '../class/shopInMall_tbl';
import { DijkstraAlgo } from '../class/dijkstra-algorithm';
// import { setgroups} from 'process'

@Component({
  selector: 'app-all-shops',
  templateUrl: './all-shops.component.html',
  styleUrls: ['./all-shops.component.css']
})
export class AllShopsComponent implements OnInit {
  @Input() valueFromCategoryComponent: string;
  // @Input() lstOfShopFromMAP: string;
 
  scurrentLat: any;
  scurrentLong: any;
  marker: google.maps.Marker;
  show: boolean;

  constructor() {
   }

  //הגדרת משתנים
  lstMalls: Array<malls> = new Array<malls>();
  inputValue: string = "";
  lstShops: Array<ShoppInMall> = new Array<ShoppInMall>();
  flag: boolean = true;
  israel = { lat: 32.0127463274658, lng: 34.7789974668429 };
  map: google.maps.Map;
  position: any;


  ngOnInit(): void {
    this.show=true;
    this.findMe();
    // this.mapSevice =  new MapService(this.map);
    // set map options
    this.map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {

        mapTypeControl: false,
        mapId: "6a2a54cc8596dad4",
        zoom: 18,
        center: this.israel,
      } as google.maps.MapOptions
    );


  }

  findMe() {
    if (navigator.geolocation) {

      //getCurrentPosition() => get the curent position of the user 
      navigator.geolocation.getCurrentPosition((position) => {
        this.scurrentLat = position.coords.latitude;
        this.scurrentLong = position.coords.longitude;

        // now we save the position end Changes the center of the map to the given {@link LatLng}.
        const location = new google.maps.LatLng(this.scurrentLat, this.scurrentLong);
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
      this.scurrentLat = marker.position.lat();
      this.scurrentLong = marker.position.lng();

      
      // Create the places service.
      let service = new google.maps.places.PlacesService(this.map);

      // Perform a nearby search to find all the mall in the given radius
      service.nearbySearch(
        { location: { lat: this.scurrentLat, lng: this.scurrentLong }, radius: 5000, type: "shopping_mall" },
        (
          results: google.maps.places.PlaceResult[] | null,
          status: google.maps.places.PlacesServiceStatus

        ) => {
          if (status !== "OK" || !results) return;

          // console.log(results)
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
    
    let selected_mall = this.lstMalls.find(m => m.MallName.trim() == event.trim())
    // Create the places service.
    const service = new google.maps.places.PlacesService(this.map);

    //get the other results if clike on the button "more"
    let getNextPage: () => void | false;
    const moreButton = document.getElementById("more") as HTMLButtonElement;
    moreButton.onclick = function () {
      moreButton.disabled = true;
      if (getNextPage) {
        getNextPage();
      }
    };

    // Perform a nearby search.
    if(selected_mall!=undefined){
      service.nearbySearch(
        { location: { lat: selected_mall.CurentLat, lng: selected_mall.CurentLang }, radius: 100, types: [ 'point_of_interest'] },
        (
          results: google.maps.places.PlaceResult[] | null,
          status: google.maps.places.PlacesServiceStatus,
          pagination: google.maps.places.PlaceSearchPagination | null
        ) => {
          if (status !== "OK" || !results) return;
          // console.log(results)
          results.forEach(sm => {
            if (sm.vicinity != selected_mall.vicinity) return;
            this.lstShops.push({
              place_id: sm.place_id,
              name: sm.name,
              CurentLang: sm.geometry.location.lng(),
              CurentLat: sm.geometry.location.lat(),
              vicinity: sm.vicinity,
              // global_code: sm.plus_code.global_code,
              start: false
            }
            )
            new google.maps.Marker({
              map: this.map,
              title: sm.name!,
              position: sm.geometry.location,
            });
          })
  
          moreButton.disabled = !pagination || !pagination.hasNextPage;
          if (pagination && pagination.hasNextPage) {
            getNextPage = () => {
              // Note: nextPage will call the same handler function as the initial call
              pagination.nextPage();
            };
          }
        }
      );
    let  center= new google.maps.LatLng(selected_mall.CurentLat,selected_mall.CurentLang)
      this.map.panTo(center);
      this.map.setZoom(19);

    }
  
  
  }

  myshops = []; 
  
  selectshop(item) {
    if (item.selected == undefined || item.selected == false) {
      item.selected = true
      this.myshops.push(item)
    }
    else {
      item.selected = false;
      this.myshops = this.myshops.filter(s => s.selected == true)
    }
  }
  getway() {
    this.myshops.unshift({
      place_id: -1,
      name: 'מיקום נוכחי',
      CurentLang: this.scurrentLong,
      CurentLat: this.scurrentLat,
      vicinity: '',
      global_code: 0,
      start: true
    }
    )
    new DijkstraAlgo(this.map).makeAmapPoint(this.myshops)
  }

}






