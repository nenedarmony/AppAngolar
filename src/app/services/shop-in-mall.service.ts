import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shopsInMall } from '../class/shopInMall_tbl';

@Injectable({
  providedIn: 'root'
})
export class ShopInMallService {
  url='https://localhost:44381/api/shopsInMall';
  constructor(private active:Router,private myhttp:HttpClient) { }
  GetAll():Observable<shopsInMall[]>{
    return this.myhttp.get<shopsInMall[]>(this.url+"GetAll")
  }
  Post(shopsInMall:shopsInMall):Observable<number>{
    return this.myhttp.post<number>(this.url+"Post",shopsInMall);
  }
  Put(shopsInMall:shopsInMall):Observable<number>{
    return this.myhttp.put<number>(this.url+"Put",shopsInMall);
  }
  delete(id:number ):Observable<boolean>{
    return this.myhttp.delete<boolean>(this.url+"delete"+id); 
  }
}
