import { Component, OnInit } from '@angular/core';
import { shops } from '../class/shops_tbl';
import { ShopsService } from '../services/shops.service';

@Component({
  selector: 'app-all-shops',
  templateUrl: './all-shops.component.html',
  styleUrls: ['./all-shops.component.css']
})
export class AllShopsComponent implements OnInit {
  
 lstShops:Array<shops> = new Array<shops>();
  constructor(private shopServer : ShopsService) { }

  ngOnInit(): void {
    this.shopServer.GetAll().subscribe(x=>this.lstShops=x);
  }

}
