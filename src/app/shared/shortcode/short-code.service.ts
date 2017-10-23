import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()

@Injectable()
export class ShortCodeService {

  constructor(private http:Http) { }

  generateKey() {
    return this.http.get('/api/generateShortCode').map((res: Response) => res.json());
  }

  getShortCode(): Observable<any> {
    return this.generateKey().map(data => data);
  }
}
