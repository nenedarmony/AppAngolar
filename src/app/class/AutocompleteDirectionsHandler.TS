export class AutocompleteDirectionsHandler {
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
          window.alert("Please enter a place");
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