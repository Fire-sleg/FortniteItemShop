export class FortniteApiResponse {
  public status?: number;
  public data?: FortniteShopData;
}

export class FortniteShopData {
  public featured?: FortniteShopCategory;
  public daily?: FortniteShopCategory;
  // Додайте інші необхідні вам властивості
}

export class FortniteShopCategory {
  public name?: string;
  public entries?: FortniteShopEntry[];
}

export class FortniteShopEntry {
  public regularPrice?: number;
  public finalPrice?: number;
  public bundle?: FortniteShopBundle;
  public banner?: FortniteShopBanner;
  public items?: FortniteShopItem[];
  public sectionId?: string;
}

export class FortniteShopBundle {
  public name?: string;
  public info?: string;
  public image?: string;
}

export class FortniteShopItem {
  public name?: string;
  public images?: Image;
  public series?: Series;
  public rarity?: Rarity;
  public type?: ItemType;
}

export class Image {
  public icon?: string;
  public featured?: string;
}

export class Series {
  public value?: string;
  public image?: string;
}

export class Rarity {
  public value?: string;
  public displayValue?: string;
  public backendValue?: string;
}

export class ItemType {
  public value?: string;
  public displayValue?: string;
  public backendValue?: string;
}

export class FortniteShopBanner {
  public value?: string;
  public intensity?: string;
  public backendValue?: string;
}
