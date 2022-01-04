import { } from 'googlemaps';
import { malls } from '../class/malls_tbl';
import { ShoppInMall } from '../class/shopInMall_tbl';

export class MapService {
  map: google.maps.Map;
  originPlaceId: string;
  destinationPlaceId: string;
  travelMode: google.maps.TravelMode;
  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;
  PlacesService: google.maps.places.PlacesService;

  lstMalls: Array<malls> = new Array<malls>();
  lstShops: Array<ShoppInMall> = new Array<ShoppInMall>();
  ismalSelected: boolean = false;
  selectedMall: ShoppInMall;
  marker: any;
  currentLat: any;
  currentLong: any;
  constructor() {
    this.originPlaceId = "";
    this.destinationPlaceId = "";
    this.travelMode = google.maps.TravelMode.WALKING;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
  }

  init(map: google.maps.Map){

    this.map = map;
    this.directionsRenderer.setMap(map);
    this.PlacesService = new google.maps.places.PlacesService(map)
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

      this.lstMalls = this.findMall(this.currentLat, this.currentLong)
    });
  }

  searchMall(event) {
    let selected_mall = this.lstMalls.find(m => m.MallName.trim() == event.trim())
    // console.log("the selected mal is:" + selected_mall.vicinity);//to remove
    let potision = new google.maps.LatLng(selected_mall.CurentLat, selected_mall.CurentLang);
    this.map.panTo(potision);
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
        if (status !== "OK" || !results) return;
        results.forEach(sm => {
          if (sm.vicinity != selected_mall.vicinity) return;
          this.lstShops.push({
            place_id: sm.place_id,
            name: sm.name,
            CurentLang: sm.geometry.location.lng(),
            CurentLat: sm.geometry.location.lat(),
            vicinity: sm.vicinity,
            global_code: sm.plus_code.global_code,
            start: false
          }
          )

          new google.maps.Marker({
            map: this.map,
            title: sm.name!,
            position: sm.geometry.location,
          });
        })


      })
  }



  findMall(currentLat: number, currentLong: number) {
    this.PlacesService.nearbySearch(
      { location: { lat: currentLat, lng: currentLong }, radius: 5000, type: "shopping_mall" },
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
    this.ismalSelected = true;
    return this.lstMalls;
  }

  findShopInMall(selected_mall: ShoppInMall) {
    this.selectedMall = selected_mall;
    // const service = new google.maps.places.PlacesService(this.map);
    // Perform a nearby search .
    this.PlacesService.nearbySearch(
      { location: { lat: selected_mall.CurentLat, lng: selected_mall.CurentLang }, radius: 100, type: 'point_of_interest' },
      (
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus,
        pagination: google.maps.places.PlaceSearchPagination | null
      ) => {
        if (status !== "OK" || !results) return;
        results.forEach(sm => {
          if (sm.vicinity != selected_mall.vicinity) return;
          this.lstShops.push({
            place_id: sm.place_id,
            name: sm.name,
            CurentLang: sm.geometry.location.lng(),
            CurentLat: sm.geometry.location.lat(),
            vicinity: sm.vicinity,
            global_code: sm.plus_code.global_code,
            start: false
          }
          )

          new google.maps.Marker({
            map: this.map,
            title: sm.name!,
            position: sm.geometry.location,
          });
        })
      })
    return this.lstShops
  }

  getSelectedMall(selected_mall: ShoppInMall) {
    return selected_mall
  }

  isMallSelected() {
    return this.ismalSelected;
  }
  setLstShop(lst: Array<ShoppInMall>) {
    this.lstShops = lst
  }
  getListShop() {
    return this.lstShops
  }
}