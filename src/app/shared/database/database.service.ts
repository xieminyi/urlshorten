import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class DatabaseService {

  	constructor(private http: Http) { }

  	findRecord(name: string) {
		return this.http.get('/api/find', {params: {key: name}}).map((res: Response) => res.json());
	}

	createRecord(key: string, originalUrl: string) {
		return this.http.post('/api/create', {key: key, original_url: originalUrl}).subscribe();
	}

	getUsedKey(name: string): Observable<any>{
		return this.findRecord(name).map(data => data);
  	}

  	createKey(key: string, originalUrl: string){
		return this.createRecord(key, originalUrl);
  	}
}
