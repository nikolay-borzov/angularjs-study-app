class LoginWidgetController {
  isLogged = true;
  userName = 'User Name';
}

export class LoginWidget implements angular.IComponentOptions {
  static selector = 'loginWidget';
  static controller = LoginWidgetController;
  static template = require('./login-widget.component.html');
}
