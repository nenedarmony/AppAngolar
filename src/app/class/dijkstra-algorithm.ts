import { ShoppInMall } from './shopInMall_tbl';


class NodeVertex {
    nameOfVertex: string;
    weight: number;

    constructor(nameOfVertex: string, weight: number) {
        this.nameOfVertex = nameOfVertex;
        this.weight = weight;
    }
}

class Vertex {
    name: string;
    nodes: NodeVertex[];
    weight: number;

    constructor(theName: string, theNodes: NodeVertex[], theWeight: number) {
        this.name = theName;
        this.nodes = theNodes;
        this.weight = theWeight;
    }
}

class Dijkstra {
    vertices: any;
    constructor() {
        this.vertices = {};

    }

    addVertex(vertex: Vertex): void {
        this.vertices[vertex.name] = vertex;
    }


    findPointsOfShortestWay(start: string, finish: string, weight: number, vertice: any): string[] {

        let nextVertex: string = start;
        let arrayWithVertex: string[] = [];
        arrayWithVertex.push(start);
        while (arrayWithVertex.length != Object.keys(vertice).length) {

            let minWeigth: number = Number.MAX_VALUE;
            let minVertex: string = "";
            for (let i of vertice[nextVertex].nodes) {
                if (i.weight + vertice[nextVertex].weight < minWeigth) {
                    if (arrayWithVertex.find((str) => str == i.nameOfVertex) == null) {//strs.find((str) => str === value);
                        minWeigth = vertice[i.nameOfVertex].weight;
                        minVertex = i.nameOfVertex;
                    }
                }
            }
            arrayWithVertex.push(minVertex);
            nextVertex = minVertex;
        }
        return arrayWithVertex;
    }


    findShortestWay(start: string, finish: string, vertice: any): string[] {

        let nodes: any = {};
        // ולשאר הנקודות נותנים ערך מקסימליעובריפ על מטריצת הסמיכויות ,לנקודת ההתחלה נותנים ערך אפס
        for (let i in vertice) {
            if (vertice[i].name === start) {
                vertice[i].weight = 0;

            } else {
                vertice[i].weight = Number.MAX_VALUE;
            }
            //יוצרים מערך של מרחקים 
            nodes[vertice[i].name] = vertice[i].weight;
        }

        while (Object.keys(nodes).length !== 0) {
            // עוברים וממינים אותו מחדש  nodes כל איבק במערך
            let sortedVisitedByWeight: string[] = Object.keys(nodes).sort((a, b) => vertice[a].weight - vertice[b].weight);
            let currentVertex: Vertex = vertice[sortedVisitedByWeight[0]];
            for (let j of currentVertex.nodes) {
                const calculateWeight: number = currentVertex.weight + j.weight;
                if (vertice[j.nameOfVertex] != undefined)
                    if (calculateWeight < vertice[j.nameOfVertex].weight) {
                        vertice[j.nameOfVertex].weight = calculateWeight;
                    }
            }
            delete nodes[sortedVisitedByWeight[0]];
        }
        const finishWeight: number = vertice[finish].weight;
        let arrayWithVertex: string[] = this.findPointsOfShortestWay(start, finish, finishWeight, vertice).reverse();
        //  arrayWithVertex.push(finish, finishWeight.toString());
        // console.log(arrayWithVertex);
        return arrayWithVertex;
    }
}

export class DijkstraAlgo {
    map: google.maps.Map;
    directionsRenderer: google.maps.DirectionsRenderer;
    directionsService: google.maps.DirectionsService;
    constructor(map: google.maps.Map) {
        this.map = map;
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer();
        this.directionsRenderer.setMap(map);
    }
    makeAmapPoint(lstShops: Array<ShoppInMall>) {
        let start = lstShops.find(s => s.start == true)
        let dijkstra = new Dijkstra();

        for (var i = 0; i < lstShops.length; i++) {
            let v = new Array<NodeVertex>();

            let start1 = new google.maps.LatLng(lstShops[i].CurentLang, lstShops[i].CurentLat);
            for (var j = 0; j < lstShops.length; j++) {
                if (lstShops[i].name != lstShops[j].name) {
                    let point = new google.maps.LatLng(lstShops[j].CurentLang, lstShops[j].CurentLat);
                    let distance = google.maps.geometry.spherical.computeDistanceBetween(start1, point);
                    v.push(new NodeVertex(lstShops[j].name, distance));
                }
            }

            dijkstra.addVertex(new Vertex(lstShops[i].name, v, 1));


        }

        //הולכים למערך המרחקים של החנות הראשונה שהיא נקודת התחלה שלנו
        // ומוצאים בו את המרחק הכי רחוק שאותו מגדירים כנקודת סיום 

        let big = dijkstra.vertices[start.name].nodes.reduce((s, n) => {
            if (n.weight > s) {
                return n.weight
            }
            return s
        }, 0)

        let finish: NodeVertex = dijkstra.vertices[start.name].nodes.find(n => n.weight == big)
        let arrayWithVertex: string[] = dijkstra.findShortestWay(start.name, finish.nameOfVertex, dijkstra.vertices);
        this.route(lstShops, start, arrayWithVertex);
    }
    route(lstShops: Array<ShoppInMall>, start: ShoppInMall, arrayWithVertex: string[]) {
        let destination = lstShops.find(s => s.name == arrayWithVertex[0])
        let waypoints: google.maps.LatLng[] = this.directionsWaypointArry(arrayWithVertex, lstShops, destination);

        //   //Loop and Draw Path Route between the Points on MAP
        //   for (var i = 0; i < waypoints.length; i++) {
        //     if ((i + 1) < waypoints.length) {
        //       var src = waypoints[i];
        //       var des = waypoints[i + 1];
        //       // path.push(src);
        //       const me = this;
        //       me.directionsService.route({
        //         origin: src,
        //         destination: des,
        //         travelMode: google.maps.TravelMode.WALKING
        //        }, (response, status) => {
        //           if (status === "OK") {

        //           //Initialize the Path Array
        //           var path = new google.maps.MVCArray<google.maps.LatLng>();
        //           //Set the Path Stroke Color
        //           var poly = new google.maps.Polyline({
        //             geodesic: true,
        //             strokeOpacity: 1.0,
        //             strokeWeight:3,
        //             strokeColor: '#4986E7'
        //           });
        //           poly.setPath(path);
        //           for (var i = 0, len = response.routes[0].overview_path.length; i < len; i++) {
        //             path.push(response.routes[0].overview_path[i]);
        //             poly.setMap(me.map);
        //             new google.maps.Marker({
        //                 map: this.map,
        //                 position: waypoints[i],
        //               });
        //           }
        //         }
        //       });

        //     }
        //   }

        const flightPath = new google.maps.Polyline({
            path: waypoints,
            geodesic: true,
            strokeColor: "#4986E7",
            strokeOpacity: 1.0,
            strokeWeight: 3,
        });

       
        flightPath.setMap(this.map);
      
    }


    directionsWaypointArry(arrayName: string[], lstShop: Array<ShoppInMall>, destination: ShoppInMall) {
        let flightPlanCoordinates: google.maps.LatLng[] = [];
        const svgMarker = {
            path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
            fillColor: "blue",
            fillOpacity: 0.6,
            strokeWeight: 0,
            rotation: 0,
            scale: 2,
            anchor: new google.maps.Point(15, 30),
        };
         for (let i = 0; i < arrayName.length; i++) {
            let point = lstShop.find(s => s.name == arrayName[i]);
            if (point != undefined)
                flightPlanCoordinates.push(new google.maps.LatLng(point.CurentLat, point.CurentLang));

            new google.maps.Marker({
                position: flightPlanCoordinates[i],
                icon: svgMarker,
                map: this.map,
                title: point.name,
            });
        }

        return flightPlanCoordinates;
    }
}



