import { } from 'googlemaps';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }


  ngOnInit() {

    // Create a map and center it on israel.
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
    new AutocompleteDirectionsHandler(map);
    // Create the places service.
    const service = new google.maps.places.PlacesService(map);
    let getNextPage: () => void | false;
    const moreButton = document.getElementById("more") as HTMLButtonElement;

    moreButton.onclick = function () {
      moreButton.disabled = true;

      if (getNextPage) {
        getNextPage();
      }
    };

    // Perform a nearby search.
    service.nearbySearch(
      { location: pyrmont, radius: 500, type: "store" },
      (
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus,
        pagination: google.maps.places.PlaceSearchPagination | null
      ) => {
        if (status !== "OK" || !results) return;
        console.log(results)

        let list= results.map(s=> {return {lat:s.geometry.location.lat(), lan: s.geometry.location.lng()}})

        console.log(list)
        addPlaces(results, map);
        moreButton.disabled = !pagination || !pagination.hasNextPage;

        if (pagination && pagination.hasNextPage) {
          getNextPage = () => {
            // Note: nextPage will call the same handler function as the initial call
            pagination.nextPage();
          };
        }
      }
    );

  }

}
function addPlaces(
  places: google.maps.places.PlaceResult[],
  map: google.maps.Map
) {

  
  const placesList = document.getElementById("places") as HTMLElement;

  for (const place of places) {
    if (place.geometry && place.geometry.location) {
      const image = {
        url: place.icon!,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(15, 15),
      };

      new google.maps.Marker({
        map,
        icon: image,
        title: place.name!,
        position: place.geometry.location,
      });
    }
  }
}
class AutocompleteDirectionsHandler {
  map: google.maps.Map;
  originPlaceId: string;
  destinationPlaceId: string;
  travelMode: google.maps.TravelMode;
  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;

  constructor(map: google.maps.Map) {
    this.map = map;
    this.originPlaceId = "";
    this.destinationPlaceId = "";
    this.travelMode = google.maps.TravelMode.WALKING;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(map);
    this.directionsRenderer.setPanel(
      document.getElementById("right-panel") as HTMLElement
    );

    const control = document.getElementById("left-panel") as HTMLElement;
    control.style.display = "block";
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
    
    const originInput = document.getElementById(
      "origin-input"
    ) as HTMLInputElement;
    const destinationInput = document.getElementById(
      "destination-input"
    ) as HTMLInputElement;
    const modeSelector = document.getElementById(
      "mode-selector"
    ) as HTMLSelectElement;

    const originAutocomplete = new google.maps.places.Autocomplete(originInput, { componentRestrictions: { country: 'isr' } });
    // Specify just the place data fields that you need.
    originAutocomplete.setFields(["place_id"]);

    const destinationAutocomplete = new google.maps.places.Autocomplete(
      destinationInput, { componentRestrictions: { country: 'isr' } }
    );
    // Specify just the place data fields that you need.
    destinationAutocomplete.setFields(["place_id"]);

    this.setupClickListener(
      "changemode-walking",
      google.maps.TravelMode.WALKING
    );
    this.setupClickListener(
      "changemode-transit",
      google.maps.TravelMode.TRANSIT
    );
    this.setupClickListener(
      "changemode-driving",
      google.maps.TravelMode.DRIVING
    );

    this.setupPlaceChangedListener(originAutocomplete, "ORIG");
    this.setupPlaceChangedListener(destinationAutocomplete, "DEST");

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
      destinationInput
    );
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
  }

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  setupClickListener(id: string, mode: google.maps.TravelMode) {
    const radioButton = document.getElementById(id) as HTMLInputElement;

    radioButton.addEventListener("click", () => {
      this.travelMode = mode;
      this.route();
    });
  }

  setupPlaceChangedListener(
    autocomplete: google.maps.places.Autocomplete,
    mode: string
  ) {
    autocomplete.bindTo("bounds", this.map);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
        return;
      }

      if (mode === "ORIG") {
        this.originPlaceId = place.place_id;
      } else {
        this.destinationPlaceId = place.place_id;
      }
      this.route();
    });
  }

  route() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }
    const me = this;

    this.directionsService.route(
      {
        origin: { placeId: this.originPlaceId },
        destination: { placeId: this.destinationPlaceId },
        travelMode: this.travelMode,
      },
      (response, status) => {
        if (status === "OK") {
          me.directionsRenderer.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
}
