export class shopsInMall {

    constructor
    (
        public IdFromMall?: number,
        public IdFromShop?: number, 
    ) { }
 
}


export interface ShoppInMall{
    place_id:string,
    vicinity:string,
    icon:string,
    name:string,
    
}