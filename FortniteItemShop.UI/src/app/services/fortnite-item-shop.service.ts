import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FortniteApiResponse } from 'src/app/models/FortniteItemShop';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FortniteItemShopService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'https://localhost:7020/api/Fortnite/items'; // URL сервера .NET

  public getItemShop(): FortniteApiResponse[] {
    let itemShop = new FortniteApiResponse();
    return [itemShop];
  }

  public getFortniteItems(): Observable<FortniteApiResponse> {
    return this.http.get<FortniteApiResponse>(this.apiUrl);
  }
}
