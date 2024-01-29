import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FortniteApiResponse } from 'src/app/models/FortniteItemShop';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FortniteItemShopService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'https://localhost:7020/api/Fortnite/items'; // URL сервера .NET
  private url = 'Fortnite/items';

  public getItemShop(): FortniteApiResponse[] {
    let itemShop = new FortniteApiResponse();
    return [itemShop];
  }

  public getFortniteItems(): Observable<FortniteApiResponse> {
    return this.http.get<FortniteApiResponse>(this.apiUrl);
  }
}
/**this.apiUrl */
