import { FortniteApiResponse } from './models/FortniteItemShop';
import { FortniteItemShopService } from './services/fortnite-item-shop.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FortniteShopItems.UI';

  constructor(private fortniteItemShopService: FortniteItemShopService) {}

  ngOnInit(): void {
    this.fortniteItemShopService
      .getFortniteItems()
      .subscribe((result: FortniteApiResponse) => {
        this.title = result.status as any as string;
        console.log(result);
      });
  }
}
