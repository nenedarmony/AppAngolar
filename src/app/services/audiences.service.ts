import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AudiencesService {
  url="";
  constructor(private active:Router,private myhttp:HttpClient) { }
}
