
export class type{

    constructor
    (
        public type?: string,
        public colorOfMarker?: string,
        public name?: string,
        public ikon?: string,
        public hasMarker?:boolean,
        public markerArray?: google.maps.Marker[],
        public isInMall?:boolean
) { }

}

export const allTypes: Array<type> = [
{type:"clothing_store"   ,colorOfMarker:"blue" , name:" חנות בגדים             " ,ikon:"fas fa-female fa-lg",markerArray:[],isInMall:false},
{type:"bank"             ,colorOfMarker:"hot pink" , name:"בנק                     " ,ikon:"fas fa-futbol fa-lg",markerArray:[],isInMall:false},
{type:"bar"              ,colorOfMarker:"yellow" , name:" בר                     " ,ikon:"fas fa-beer",markerArray:[],isInMall:false},
{type:"restaurant"       ,colorOfMarker:"red" , name:"   מסעדות               " ,ikon:"fas fa-utensils",markerArray:[],isInMall:false},
{type:"pharmacy"         ,colorOfMarker:"purple" , name:"פארם                    " ,ikon:"fas fa-capsules",markerArray:[],isInMall:false},
{type:"book_store"       ,colorOfMarker:"green" , name:" ספרים                  " ,ikon:"fas fa-book",markerArray:[],isInMall:false},
{type:"cafe"             ,colorOfMarker:"aqua" , name:"בית כפה                 " ,ikon:"fas fa-coffee",markerArray:[],isInMall:false},
{type:"bakery"           ,colorOfMarker:"pink" , name:" מאפית                  " ,ikon:"fas fa-birthday-cake",markerArray:[],isInMall:false},
{type:"electronics_store",colorOfMarker:"salmon" , name:"מוצרי חשמל מחשב וסוללרי" ,ikon:"fas fa-laptop",markerArray:[],isInMall:false},
{type:"hair_care"        ,colorOfMarker:"whaet" , name:"טיפוח שיער              " ,ikon:"fab fa-keybase",markerArray:[],isInMall:false},
{type:"shoe_store"       ,colorOfMarker:"crimson" , name:" נעליים                 " ,ikon:"fas fa-shoe-prints",markerArray:[],isInMall:false},
{type:"supermarket"      ,colorOfMarker:"orchid" , name:"סופרמרקט                " ,ikon:"fas fa-shopping-cart",markerArray:[],isInMall:false},
{type:"furniture_store"  ,colorOfMarker:"silver" , name:"ציוד משרדי              " ,ikon:"fas fa-pencil-ruler",markerArray:[],isInMall:false},
{type:"beauty_salon"     ,colorOfMarker:"rust" , name:"קוסמטיקה ויופי          " ,ikon:"far fa-kiss-beam",markerArray:[],isInMall:false},
{type:"jewelry_store"    ,colorOfMarker:"gold" , name:"תכשיטים                 " ,ikon:"fas fa-ring",markerArray:[],isInMall:false},
];