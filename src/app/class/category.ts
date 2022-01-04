import { malls } from "./malls_tbl";
import { ShoppInMall } from "./shopInMall_tbl";
import { type, allTypes } from '../class/type';

export class category {
    typesArry: Array<type> = new Array<type>();
    map: google.maps.Map;
    service: google.maps.places.PlacesService;
    lstShops: Array<ShoppInMall> = new Array<ShoppInMall>();
    // lstMarker: Array<google.maps.Marker> = new Array<google.maps.Marker>();
    markers: Array<boolean>;
    constructor(map: google.maps.Map) {
        this.map = map;
        this.service = new google.maps.places.PlacesService(this.map);
        this.markers = new Array<boolean>();
        this.typesArry = allTypes
    }

    findategory(selected_mall: malls, type: type) {
        for (let i = 0; i < this.typesArry.length; i++) {
            if (this.typesArry[i].type == type.type) {
                var index = i;
                break
            }
        }
        if (type.hasMarker == undefined || type.hasMarker) {
            this.service.nearbySearch(
                { location: { lat: selected_mall.CurentLat, lng: selected_mall.CurentLang }, radius: 150, type: type.type },
                (
                    results: google.maps.places.PlaceResult[] | null,
                    status: google.maps.places.PlacesServiceStatus,
                    pagination: google.maps.places.PlaceSearchPagination | null
                ) => {
                    if (status !== "OK" || !results) { this.markers[index] = false; return };
                    this.markers[index] = true
                    results.forEach(sm => {
                        // if (sm.vicinity != selected_mall.vicinity) return;
                        this.lstShops.push({
                            place_id: sm.place_id,
                            name: sm.name,
                            CurentLang: sm.geometry.location.lng(),
                            CurentLat: sm.geometry.location.lat(),
                            vicinity: sm.vicinity,
                            start: false
                        }
                        )

                        this.addMarker(sm, index)
                    })

                    if (pagination && pagination.hasNextPage) {
                        // Note: nextPage will call the same handler function as the initial call
                        pagination.nextPage();


                    }
                }
            );

        }
        this.setMapOnAll(this.map,index)
    }

    getMarker() {
        return this.markers;
    }
    addMarker(sm, index: number) {
        this.typesArry[index].hasMarker = true;
        const svgMarker = {
            path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
            fillColor: this.typesArry[index].colorOfMarker,
            fillOpacity: 0.7,
            strokeWeight: 0,
            rotation: 0,
            scale: 1.3,
            anchor: new google.maps.Point(5, 5),
        };
        const marker = new google.maps.Marker({
            position: sm.geometry.location,
            icon: svgMarker,
            map: this.map,
            title: sm.name!,
        });
        this.typesArry[index].markerArray.push(marker);
    }
    //delet all the marker from the 
    deletMarkers(){
       for(let i=0 ;i< this.typesArry.length;i++ ){
        this.typesArry[i].hasMarker=undefined;
        this.removAll(this.typesArry[i])
        this.typesArry[i].markerArray=[];
       
       } 
    }
    // Sets the map on all markers in the array.
    setMapOnAll(map: google.maps.Map, index: number) {

        for (let i = 0; i < this.typesArry[index].markerArray.length; i++) {
            this.typesArry[index].markerArray[i].setMap(map);
        }
    }
    // Removes the markers from the map, but keeps them in the array.
    removAll(type: type) {
        for (let i = 0; i < this.typesArry.length; i++) {
            if (this.typesArry[i].type == type.type)
                var index = i;
        }
        if (this.typesArry[index].markerArray != undefined)
            for (let i = 0; i < this.typesArry[index].markerArray.length; i++) {
                this.typesArry[index].markerArray[i].setMap(null);
            }

    }
    setHtml() {

        let ul, li, i
        ul = document.getElementsByClassName("list-group")[0];
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length - 1; i++) {
            if (this.markers[i] == true)
                li[i].style.display = "";
            else
                li[i].style.display = "none";

        }
        li[i].style.display = "";
    }
}