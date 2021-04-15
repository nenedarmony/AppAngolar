import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { categorysInShop } from '../class/categorys_in_shop_tbl';

@Injectable({
  providedIn: 'root'
})
export class CategorysInShopService {

  url="https://localhost:44381/api/categorysInShop/";
  constructor(private active:Router,private myhttp:HttpClient) { }
  GetAll():Observable<categorysInShop[]>
  {
    return this.myhttp.get<categorysInShop[]>(this.url+"GetAll")
  }
  Post(audience:categorysInShop):Observable<number>
  {
    return this.myhttp.post<number>(this.url+"Post",audience);
  }
  Put(audience:categorysInShop):Observable<number>
  {
    return this.myhttp.put<number>(this.url+"Put",audience);
  }
  delete(id:number ):Observable<boolean>
  {
    return this.myhttp.delete<boolean>(this.url+"delete"+id); 
  }
}