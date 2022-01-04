import { } from 'googlemaps';
import { Component, OnInit, ViewChild, ElementRef, NgZone, Input } from '@angular/core';
import { AutocompleteDirectionsHandler } from "../class/AutocompleteDirectionsHandler"
import { malls } from '../class/malls_tbl';
import { ShoppInMall } from '../class/shopInMall_tbl';
import { MatOptgroup } from '@angular/material/core';
import { MapService } from '../class/map';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  @ViewChild('search')

  public searchElementRef: ElementRef;
  public directionsService: google.maps.DirectionsService;
  public directionsRenderer: google.maps.DirectionsRenderer;
  public mapSevice: MapService;

  latitude: number;
  longitude: number;
  currentLat: any;
  currentLong: any;
  map: google.maps.Map;
  position: any;
  marker: any;
  lstMalls: Array<malls> = new Array<malls>();
  // lstShops: Array<ShoppInMall> 

  inputValue: string = "";
  israel = { lat: 32.0127463274658, lng: 34.7789974668429 };

  constructor(
  ) {
   
    this.mapSevice = new MapService();
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();

  }


  ngOnInit() {

    // Create a map and center it on israel.
    const israel = { lat: 32.0127463274658, lng: 34.7789974668429 };
    this.findMe();

    this.map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {

        mapTypeControl: false,
        // mapId: "c4829a478ddce469",
        zoom: 18,
        center: israel,
        minZoom: 8,
      } as google.maps.MapOptions
    );
    this.mapSevice.init(this.map);
    new AutocompleteDirectionsHandler(this.map);


  }


  findMe() {
    if (navigator.geolocation) {

      //getCurrentPosition() => get the curent position of the user 
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;

        // now we save the position end Changes the center of the map to the given {@link LatLng}.
        const location = new google.maps.LatLng(this.currentLat, this.currentLong);
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
        this.dragedMarkerEndSetMall(this.marker)

      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }

  }

  dragedMarkerEndSetMall(marker) {

    //we add a eventListener so that whene the marker is dragged its position is seved 
    //and at the same time the nearbySearch for the mall is updated
    google.maps.event.addListener(marker, 'dragend', () => {
      this.currentLat = marker.position.lat();
      this.currentLong = marker.position.lng();

      this.lstMalls = this.mapSevice.findMall(this.currentLat, this.currentLong)
    });
  }

  searchMall(event) {
    let selected_mall = this.lstMalls.find(m => m.MallName.trim() == event.trim())
    let  lstShops=new Array<ShoppInMall>();
    let potision = new google.maps.LatLng(selected_mall.CurentLat, selected_mall.CurentLang);
    this.map.panTo(potision);
    this.map.setZoom(20);
    this.marker.setPosition(potision);
    // Create the places service.
    const service = new google.maps.places.PlacesService(this.map);

    // Perform a nearby search .
    service.nearbySearch(
      { location: { lat: selected_mall.CurentLat, lng: selected_mall.CurentLang }, radius: 100, type: 'point_of_interest' },
      (
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus,
        pagination: google.maps.places.PlaceSearchPagination | null
      ) => {
        if (status != "OK" || !results) return;
        results.forEach(sm => {
         
          // if (sm.vicinity != selected_mall.vicinity) return;
          lstShops.push({
            place_id: sm.place_id,
            name: sm.name,
            CurentLang: sm.geometry.location.lng(),
            CurentLat: sm.geometry.location.lat(),
            vicinity: sm.vicinity,
            types:sm.types,
            start: false
          }
          )
        })
        if (pagination && pagination.hasNextPage) {

          pagination.nextPage();
         
        }

      }
    )
   
  }

}



