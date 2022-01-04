
export class ShoppInMall {
    constructor
        (
            public place_id?: string,
            public name?: string,
            public CurentLat?: number,
            public CurentLang?: number,
            public vicinity?: string,
            public photo?: any,
           public global_code?: string,
           public start? :boolean,
           public types? : Array<any>
    ) { }

}