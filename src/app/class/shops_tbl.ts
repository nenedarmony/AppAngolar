export class shops {

    constructor(
        public ShopID?: number,
        public ShopName?: string,
        public IdFromAudience? : number
        
    ) { }
}

export interface ShoppingMall{
    place_id:string,
    vicinity:string,
    icon:string,
    name:string,
    
}