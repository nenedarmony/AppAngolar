import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { custumers } from '../class/custumers_tbl';

@Injectable({
  providedIn: 'root'
})
export class CustumersService {
  url='https://localhost:44381/api/custumers/';
  constructor(private active:Router,private myhttp:HttpClient) { }
  GetAll():Observable<custumers[]>{
    return this.myhttp.get<custumers[]>(this.url+"GetAll")
  }
  Post(custumers:custumers):Observable<number>{
    return this.myhttp.post<number>(this.url+"Post",custumers);
  }
  Put(custumers:custumers):Observable<number>{
    return this.myhttp.put<number>(this.url+"Put",custumers);
  }
  delete(id:number ):Observable<boolean>{
    return this.myhttp.delete<boolean>(this.url+"delete"+id); 
  }
}
