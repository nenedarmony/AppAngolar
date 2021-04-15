import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shops } from '../class/shops_tbl';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {
  url='https://localhost:44381/api/shops/';
  constructor(private active:Router,private myhttp:HttpClient) { }
  GetAll():Observable<shops[]>{
    return this.myhttp.get<shops[]>(this.url+"GetAll")
  }
  Post(shops:shops):Observable<number>{
    return this.myhttp.post<number>(this.url+"Post",shops);
  }
  Put(shops:shops):Observable<number>{
    return this.myhttp.put<number>(this.url+"Put",shops);
  }
  delete(id:number ):Observable<boolean>{
    return this.myhttp.delete<boolean>(this.url+"delete"+id); 
  }
}
