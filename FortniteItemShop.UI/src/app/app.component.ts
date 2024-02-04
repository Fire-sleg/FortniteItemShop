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
  entries: FortniteShopEntry[] = [];
  uniqueEntries: FortniteShopEntry[][] = [];

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

  getItemImageSrc(item: FortniteShopItem): string | undefined {
    return item.images?.featured ?? item.images?.icon;
    //item.Images?.Featured ?? item.Images?.Icon
  }

  getBundleItems(item: FortniteShopEntry): FortniteShopEntry[] | undefined {
    return this.fortniteApiResponse.data?.featured?.entries?.filter(
      (e) => e.sectionId === item.sectionId && e.bundle === null
    );
  }

  getItemsFromEntry(entry: FortniteShopEntry): FortniteShopItem[] | undefined {
    return entry.items?.filter((r) => r.type?.value !== 'backpack');
  }

  /* groupEntriesBySetValue(entries: FortniteShopEntry[]): FortniteShopEntry[][] {
    const groupedEntries: { [key: string]: FortniteShopEntry[] } = {};
    //debugger;

    // Групуємо FortniteShopItem за значенням set.value
    entries.forEach((entry) => {
      if (entry.items) {
        entry.items.forEach((item) => {
          const setValue = item.set?.value;
          if (setValue) {
            if (!groupedEntries[setValue]) {
              groupedEntries[setValue] = [];
            }
            groupedEntries[setValue].push(entry);
          }
        });
      }
    });

    // Створюємо новий список FortniteShopEntry зі зібраними FortniteShopItem
    const newEntries: FortniteShopEntry[][] = [];
    for (const setValue in groupedEntries) {
      if (groupedEntries.hasOwnProperty(setValue)) {
        newEntries.push(groupedEntries[setValue]);
      }
    }
    const uniqueEntries: FortniteShopEntry[][] = [];

    newEntries.forEach((entry) => {
      uniqueEntries.push(this.getUniqueEntries(entry));
    });

    this.sameEntries = newEntries;
    console.log(uniqueEntries);
    return newEntries;
  }
  getUniqueEntries(newEntries: FortniteShopEntry[]): FortniteShopEntry[] {
    const uniqueEntries: FortniteShopEntry[] = [];
    newEntries.forEach((entry) => {
      if (
        !uniqueEntries.some(
          (uniqueEntry) => uniqueEntry.offerId === entry.offerId
        )
      ) {
        uniqueEntries.push(entry);
      }
    });
    return uniqueEntries;
  } */

  /* groupItemsBySetValue(entries: FortniteShopEntry[]): FortniteShopEntry[] {
    const groupedEntries: { [key: string]: FortniteShopItem[] } = {};
    //debugger;

    // Групуємо FortniteShopItem за значенням set.value
    entries.forEach((entry) => {
      if (entry.items) {
        entry.items.forEach((item) => {
          const setValue = item.set?.value;
          if (setValue) {
            if (!groupedEntries[setValue]) {
              groupedEntries[setValue] = [];
            }
            groupedEntries[setValue].push(item);
          }
        });
      }
    });

    // Створюємо новий список FortniteShopEntry зі зібраними FortniteShopItem
    const newEntries: FortniteShopEntry[] = [];
    for (const setValue in groupedEntries) {
      if (groupedEntries.hasOwnProperty(setValue)) {
        const newEntry = new FortniteShopEntry();
        newEntry.items = groupedEntries[setValue];
        newEntries.push(newEntry);
      }
    }
    this.sameEntries = newEntries;
    return newEntries;
  } */

  ngOnInit(): void {
    this.fortniteItemShopService.getFortniteItems().subscribe((result: any) => {
      this.bundles = result.bundles;
      this.fortniteApiResponse = result.fortniteApiResponse;
      this.entries = result.entries;
      this.uniqueEntries = result.uniqueEntries;
    });
  }
}
