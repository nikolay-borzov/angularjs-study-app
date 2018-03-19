import { browser, element, by, ElementFinder } from 'protractor';

class LoginPage {
  page: ElementFinder;
  form: ElementFinder;
  submitButton: ElementFinder;
  loginField: ElementFinder;
  passwordField: ElementFinder;
  errorMessage: ElementFinder;

  constructor() {
    this.page = element(by.tagName('login-page'));
    this.form = element(by.tagName('login-form'));
    this.submitButton = this.form.element(by.css('[type="submit"]'));
    this.loginField = this.form.element(by.model('$ctrl.model.login'));
    this.passwordField = this.form.element(by.model('$ctrl.model.password'));
    this.errorMessage = this.form.element(by.binding('$ctrl.errorText'));
  }

  get() {
    return browser.get('/#/login');
  }

  setLogin(value: string) {
    return this.loginField.sendKeys(value);
  }

  setPassword(value: string) {
    return this.passwordField.sendKeys(value);
  }

  submitForm() {
    return this.form.element(by.tagName('form')).submit();
  }
}

export const po = new LoginPage();
