import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { malls } from '../class/malls_tbl';

@Injectable({
  providedIn: 'root'
})
export class MallsService {
  url='https://localhost:44381/api/malls/';
  constructor(private active:Router,private myhttp:HttpClient) { }

  GetAll():Observable<malls[]>
  {
    return this.myhttp.get<malls[]>(this.url+"GetAll")
  }
  Post(malls:malls):Observable<number>
  {
    return this.myhttp.post<number>(this.url+"Post",malls);
  }
  Put(malls:malls):Observable<number>
  {
    return this.myhttp.put<number>(this.url+"Put",malls);
  }
  delete(id:number ):Observable<boolean>
  {
    return this.myhttp.delete<boolean>(this.url+"delete"+id); 
  }
}
