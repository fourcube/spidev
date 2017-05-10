import { browser, element, by } from 'protractor';

export class SpivisPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('sv-root h1')).getText();
  }
}
