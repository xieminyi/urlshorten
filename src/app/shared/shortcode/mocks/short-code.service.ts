import { SpyObject } from './helper';
import { ShortCodeService } from '../short-code.service';
import Spy = jasmine.Spy;

export class MockShortCodeService extends SpyObject {
  generateKeySpy: Spy;
  getShortCodeSpy: Spy;
  fakeResponse: any;

  constructor() {
    super( ShortCodeService );

    this.fakeResponse = null;
    this.generateKeySpy = this.spy('generateKey').andReturn(this);
    this.getShortCodeSpy = this.spy('getShortCode').andReturn(this);
  }

  subscribe(callback: any) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }
}