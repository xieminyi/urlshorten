import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

export class MockActivatedRouteDatabase extends ActivatedRoute {
  params: Observable<Params>;

  constructor(parameters?: { [key: string]: any; }) {
    super();
    this.params = Observable.of(parameters);
  }
}

export class MockRouterDatabase {
  navigate = jasmine.createSpy('navigate');
}