class LoginFormController {}

export class LoginForm implements angular.IComponentOptions {
  static selector = 'loginForm';
  static controller = LoginFormController;
  static template = require('./login-form.html');
}
