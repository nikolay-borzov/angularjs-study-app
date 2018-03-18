import { browser, element, by, ElementFinder } from 'protractor';

class LoginPage {
  page: ElementFinder;
  form: ElementFinder;
  submitButton: ElementFinder;
  loginField: ElementFinder;
  passwordFirled: ElementFinder;

  constructor() {
    this.page = element(by.tagName('login-page'));
    this.form = element(by.tagName('login-form'));
    this.submitButton = this.form.element(by.css('[type="submit"]'));
    this.loginField = this.form.element(by.model('$ctrl.model.login'));
    this.passwordFirled = this.form.element(by.model('$ctrl.model.password'));
  }

  get() {
    return browser.get('/#/login');
  }

  setLogin(value: string) {
    return this.loginField.sendKeys(value);
  }
}

export const po = new LoginPage();
