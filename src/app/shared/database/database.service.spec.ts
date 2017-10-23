import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { DatabaseService } from './database.service';
import { BaseRequestOptions, Http, ConnectionBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';


describe('DatabaseService', () => {
	beforeEach(() => {
	    TestBed.configureTestingModule({
	      providers: [DatabaseService,
	      {
	      	provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
	      		return new Http(backend, defaultOptions);
	      	}, deps: [MockBackend, BaseRequestOptions]
	      },
	      { provide: MockBackend, useClass: MockBackend },
	      { provide: BaseRequestOptions, useClass: BaseRequestOptions }
	      ]
	    });
	});

  	it('should retrieve the data from database',
	  inject([DatabaseService, MockBackend], fakeAsync((databaseService: DatabaseService, mockBackend: MockBackend) => {
	    let res: Response;
	    mockBackend.connections.subscribe(c => {
	      expect(c.request.url).toBe('/api/find?key=abc');
	      const response = new ResponseOptions({body: '[{"key": "abc", "original_url":"http://sample-url"}]'});
	      c.mockRespond(new Response(response));
	    });
	    databaseService.findRecord('abc').subscribe((response) => {
	      res = response;
	    });
	    tick();
	    expect(res[0]).toEqual({"key": "abc", "original_url":"http://sample-url"});
	  }))
	);
});
