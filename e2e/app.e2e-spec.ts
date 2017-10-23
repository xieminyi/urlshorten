import { browser, by, element } from 'protractor';

describe('Subimit original url and get short one', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should have groups of label and input, and one submit button', () => {
    expect(element(by.css('app-root app-short-url form label')).isPresent()).toEqual(true);
    expect(element(by.css('app-root app-short-url form input')).isPresent()).toEqual(true);
    expect(element(by.css('app-root app-short-url form button')).isPresent()).toEqual(true);
  });

  it('should have results display', () => {
    expect(element(by.css('app-root app-short-url ul')).isPresent()).toEqual(true);
    expect(element(by.css('app-root app-short-url li')).isPresent()).toEqual(true);
  });

  it('should allow submiting', () => {
    const submitButton = element(by.css('button'));
    const submitBox = element(by.css('input'));
    submitBox.sendKeys('http://any-long-url-for-testing-purpose.com.au/?withParam="params"');
    submitButton.click().then(() => {
      const list = element.all(by.css('app-short-url li'));
      expect(list.count()).toBe(2);    
    });
  });
});