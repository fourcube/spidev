import { SpivisPage } from './app.po';

describe('spivis App', () => {
  let page: SpivisPage;

  beforeEach(() => {
    page = new SpivisPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('sv works!');
  });
});
