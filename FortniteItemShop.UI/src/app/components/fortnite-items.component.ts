import { FortniteItemShopService } from '../services/fortnite-item-shop.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fortnite-items',
  templateUrl: 'fortnite-items.component.html',
  styleUrls: ['fortnite-items.component.css'],
})
export class FortniteItemsComponent implements OnInit {
  items: any;

  constructor(private fortniteItemShopService: FortniteItemShopService) {}

  ngOnInit(): void {
    this.fortniteItemShopService.getFortniteItems().subscribe((data) => {
      this.items = data;
    });
  }
}
