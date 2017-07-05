import { CeilingsPage } from './app.po';

describe('ceilings App', () => {
  let page: CeilingsPage;

  beforeEach(() => {
    page = new CeilingsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
