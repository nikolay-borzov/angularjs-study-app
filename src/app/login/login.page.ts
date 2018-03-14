class LoginPageController {}

export class LoginPage implements angular.IComponentOptions {
  static selector = 'loginPage';
  static controller = LoginPageController;
  static template = require('./login.page.html');
}
