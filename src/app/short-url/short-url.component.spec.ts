import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShortUrlComponent } from './short-url.component';

import { MockShortCodeService } from '../shared/shortcode/mocks/short-code.service';
import { MockActivatedRouteShortCode, MockRouterShortCode } from '../shared/shortcode/mocks/routes';
import { ShortCodeService } from '../shared/shortcode/short-code.service';

import { MockDatabaseService } from '../shared/database/mocks/database.service';
import { MockActivatedRouteDatabase, MockRouterDatabase } from '../shared/database/mocks/routes';
import { DatabaseService } from '../shared/database/database.service';

import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('ShortUrlComponent', () => {
  let component: ShortUrlComponent;
  let fixtureShortCode: ComponentFixture<ShortUrlComponent>;

  // definitions for short code service
  let mockShortCodeService: MockShortCodeService;
  let mockActivatedRouteShortCode: MockActivatedRouteShortCode;
  let mockRouterShortCode: MockRouterShortCode;

  // definitions for database service
  let mockDatabaseService: MockDatabaseService;
  let mockActivatedRouteDatabase: MockActivatedRouteDatabase;
  let mockRouterDatabase: MockRouterDatabase;

  beforeEach(() => {
    mockShortCodeService = new MockShortCodeService();
    mockDatabaseService = new MockDatabaseService();

    mockActivatedRouteShortCode = new MockActivatedRouteShortCode({'term': ''});
    mockRouterShortCode = new MockRouterShortCode();

    mockActivatedRouteDatabase = new MockActivatedRouteDatabase({'term': ''});
    mockRouterDatabase = new MockRouterDatabase();

    TestBed.configureTestingModule({
      declarations: [ShortUrlComponent],
      providers: [
        {provide: ShortCodeService, useValue: mockShortCodeService},
        {provide: ActivatedRoute, useValue: mockActivatedRouteShortCode},
        {provide: Router, useValue: mockRouterShortCode},
        {provide: DatabaseService, useValue: mockDatabaseService},
        {provide: ActivatedRoute, useValue: mockActivatedRouteDatabase},
        {provide: Router, useValue: mockRouterDatabase}
      ],
      imports: [FormsModule, RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixtureShortCode = TestBed.createComponent(ShortUrlComponent);
    component = fixtureShortCode.componentInstance;
    fixtureShortCode.detectChanges();
  });

  it('should querying new key when no nickname and submit is called', () => {
    component = fixtureShortCode.debugElement.componentInstance;
    component.submit();
    expect(mockShortCodeService.getShortCodeSpy).toHaveBeenCalledWith();
  });

  it('should search key in database when a nickname is set and submit is called', () => {
    component = fixtureShortCode.debugElement.componentInstance;
    component.nickname = 'abc';
    component.submit();
    expect(mockDatabaseService.getUsedKeySpy).toHaveBeenCalledWith('abc');
  });
});
