import { AuthService } from '../core/services/auth.service';

import { ILoginModel } from './login-model';

class LoginPageController {
  loginError: string;

  constructor(
    private $state: ng.ui.IStateService,
    private authService: AuthService
  ) {
    'ngInject';
  }

  logIn({ login, password }: ILoginModel) {
    this.authService
      .logIn(login, password)
      .then((response: any) => {
        this.$state.go('courses');
      })
      .catch((reason: any) => {
        this.loginError = 'Wrong login or password';
      });
  }
}

export class LoginPage implements ng.IComponentOptions {
  static selector = 'loginPage';
  static controller = LoginPageController;
  static template = require('./login.template.html');
}
