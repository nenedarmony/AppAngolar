import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { custumerHistorys } from '../class/custumer_historys_tbl';

@Injectable({
  providedIn: 'root'
})
export class CustumerHistorysService {

  url="https://localhost:44381/api/custumerHistorys/";
  constructor(private active:Router,private myhttp:HttpClient) { }
  GetAll():Observable<custumerHistorys[]>
  {
    return this.myhttp.get<custumerHistorys[]>(this.url+"GetAll")
  }
  Post(custumerHistorys:custumerHistorys):Observable<number>
  {
    return this.myhttp.post<number>(this.url+"Post",custumerHistorys);
  }
  Put(custumerHistorys:custumerHistorys):Observable<number>
  {
    return this.myhttp.put<number>(this.url+"Put",custumerHistorys);
  }
  delete(id:number ):Observable<boolean>
  {
    return this.myhttp.delete<boolean>(this.url+"delete"+id); 
  }
}
