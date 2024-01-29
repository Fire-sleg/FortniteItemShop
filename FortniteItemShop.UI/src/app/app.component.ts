import {
  FortniteApiResponse,
  FortniteShopBundle,
  FortniteShopEntry,
  FortniteShopItem,
} from './models/FortniteItemShop';
import { FortniteItemShopService } from './services/fortnite-item-shop.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FortniteShopItems.UI';
  fortniteApiResponse: FortniteApiResponse = new FortniteApiResponse();
  bundles: FortniteShopEntry[] = [];
  bundleItems: FortniteShopEntry[] = [];

  constructor(private fortniteItemShopService: FortniteItemShopService) {}

  getFirstItemImageUrl(item: FortniteShopEntry): string | undefined {
    if (item && item.items && item.items.length > 0) {
      const firstItem = item.items[0];
      return firstItem.series ? firstItem.series.image : undefined;
    }
    return undefined;
  }
  /*src="@(item.Items.FirstOrDefault().Images?.Featured ?? item.Items.FirstOrDefault().Images?.Icon) */
  getFirstItemImageSrc(item: FortniteShopEntry): string | undefined {
    return item.items?.[0]?.images?.featured ?? item.items?.[0]?.images?.icon;
  }

  getBundleItems(item: FortniteShopEntry): FortniteShopEntry[] | undefined {
    return this.fortniteApiResponse.data?.featured?.entries?.filter(
      (e) => e.sectionId === item.sectionId && e.bundle === null
    );
  }

  ngOnInit(): void {
    this.fortniteItemShopService
      .getFortniteItems()
      .subscribe((result: FortniteApiResponse) => {
        this.fortniteApiResponse = result;
        this.bundles = result.data?.featured?.entries?.filter(
          (item) => item.bundle !== null
        ) as FortniteShopEntry[];
      });
  }
}
