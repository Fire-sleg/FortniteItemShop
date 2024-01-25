import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FortniteItemShop } from 'src/app/models/FortniteItemShop';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FortniteItemShopService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'https://localhost:7020/api/Fortnite/items'; // URL сервера .NET

  public getItemShop(): FortniteItemShop[] {
    let itemShop = new FortniteItemShop();
    return [itemShop];
  }

  public getFortniteItems(): Observable<FortniteItemShop> {
    return this.http.get<FortniteItemShop>(this.apiUrl);
  }
}
