class LoginPage {
  get() {
    browser.get('/#/login');
  }

  getPageElement() {
    return element(by.id('login-page'));
  }

  getFormElement() {
    return element(by.id('login-form'));
  }
}

module.exports = new LoginPage();
