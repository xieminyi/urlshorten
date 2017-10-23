import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { ShortCodeService } from './short-code.service';
import { BaseRequestOptions, Http, ConnectionBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';


describe('ShortCodeService', () => {
	beforeEach(() => {
	    TestBed.configureTestingModule({
	      providers: [ShortCodeService,
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

  	it('should retrieve the shorten result',
	  inject([ShortCodeService, MockBackend], fakeAsync((shortCodeService: ShortCodeService, mockBackend: MockBackend) => {
	    let res: Response;
	    mockBackend.connections.subscribe(c => {
	      expect(c.request.url).toBe('/api/generateShortCode');
	      const response = new ResponseOptions({body: '[{"newKey": "abc"}]'});
	      c.mockRespond(new Response(response));
	    });
	    shortCodeService.generateKey().subscribe((response) => {
	      res = response;
	    });
	    tick();
	    expect(res[0]).toEqual({"newKey": "abc"});
	  }))
	);
});
