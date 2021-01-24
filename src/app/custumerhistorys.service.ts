import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CustumerhistorysService {

  url="";
  constructor(private active:Router,private myhttp:HttpClient) { }
}
