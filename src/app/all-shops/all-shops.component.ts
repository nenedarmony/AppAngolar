import { } from 'googlemaps';
import { Component, OnInit } from '@angular/core';
import { ShoppingMall, shops } from '../class/shops_tbl';
import { ShopsService } from '../services/shops.service';

@Component({
  selector: 'app-all-shops',
  templateUrl: './all-shops.component.html',
  styleUrls: ['./all-shops.component.css']
})
export class AllShopsComponent implements OnInit {
lstMalls = new  Array<ShoppingMall>();
  lstShops: Array<shops> = new Array<shops>();
  constructor(private shopServer: ShopsService) { }
  flag: boolean = true;
  ngOnInit(): void {
   // this.shopServer.GetAll().subscribe(x => this.lstShops = x);
    const pyrmont = { lat: 32.0127463274658, lng: 34.7789974668429 };
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {

        mapTypeControl: false,
        mapId: "6a2a54cc8596dad4",
        zoom: 18,
        center: pyrmont,
      } as google.maps.MapOptions
    );

    // Create the places service.
    const service = new google.maps.places.PlacesService(map);
     // Perform a nearby search.
     service.nearbySearch(
      { location: pyrmont, radius: 500, type: "shopping_mall" },
      (
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus,
        pagination: google.maps.places.PlaceSearchPagination | null
      ) => {
        if (status !== "OK" || !results) return;

          console.log(results)

           results.forEach(sm=>
            this.lstMalls.push({ place_id: sm.place_id, vicinity: sm.vicinity, name : sm.name, icon : sm.icon}))

      }

     )
  }
  searchMall(val:string) {
    console.log(val)
    let selected_mall = this.lstMalls.find(m=>m.name.trim() == val.trim())

    console.log(selected_mall);
    
  }
}
