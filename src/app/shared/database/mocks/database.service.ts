import { SpyObject } from './helper';
import { DatabaseService } from '../database.service';
import Spy = jasmine.Spy;

export class MockDatabaseService extends SpyObject {
  findRecordSpy: Spy;
  getByIdSpy: Spy;
  createRecordSpy: Spy;
  getUsedKeySpy: Spy;
  fakeResponse: any;

  constructor() {
    super( DatabaseService );

    this.fakeResponse = null;
    this.findRecordSpy = this.spy('findRecord').andReturn(this);
    this.createRecordSpy = this.spy('createRecord').andReturn(this);
    this.getUsedKeySpy = this.spy('getUsedKey').andReturn(this);
  }

  subscribe(callback: any) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }
}