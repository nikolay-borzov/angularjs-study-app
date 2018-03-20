import { AuthService } from '../core/services/auth.service';
import { User } from '../core/entities/user';

import { ILoginModel } from './login-model';

class LoginPageController {
  loginError: string;
  loggedAs: User;

  constructor(
    private $state: ng.ui.IStateService,
    private authService: AuthService
  ) {
    'ngInject';
  }

  logIn({ login, password }: ILoginModel) {
    this.authService
      .logIn(login, password)
      .then(() => {
        this.$state.go('courses');
      })
      .catch(() => {
        this.loginError = 'Wrong login or password';
      });
  }

  logOut() {
    this.authService.logOut().then(() => {
      this.$state.reload();
    });
  }
}

export class LoginPage implements ng.IComponentOptions {
  static selector = 'loginPage';
  static controller = LoginPageController;
  static template = require('./login.template.html');
  static bindings = {
    loggedAs: '<'
  };
}
