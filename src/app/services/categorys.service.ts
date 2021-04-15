import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../class/categorys_tbl';

@Injectable({
  providedIn: 'root'
})
export class CategorysService {
  url='https://localhost:44381/api/Categorys/';
  constructor(private active:Router,private myhttp:HttpClient) { }

  GetAll():Observable<Category[]>
  {
    return this.myhttp.get<Category[]>(this.url+"GetAll")
  }
  Post(category:Category):Observable<number>
  {
    return this.myhttp.post<number>(this.url+"Post",category);
  }
  Put(category:Category):Observable<number>
  {
    return this.myhttp.put<number>(this.url+"Put",category);
  }
  delete(id:number ):Observable<boolean>
  {
    return this.myhttp.delete<boolean>(this.url+"delete"+id); 
  }
}
