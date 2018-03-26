import { TargetState, StateService } from '@uirouter/core';
import * as angular from 'angular';

import { AuthService } from '../core/services/auth.service';
import { User } from '../core/entities/user';

import { ILoginModel } from './login-model';

class LoginPageController {
  loginError: string;
  loggedAs: User;
  returnTo: TargetState;

  constructor(private $state: StateService, private authService: AuthService) {
    'ngInject';
  }

  logIn({ login, password }: ILoginModel) {
    this.authService
      .logIn(login, password)
      .then(this.redirectAfterLogin)
      .catch(() => {
        this.loginError = 'Wrong login or password';
      });
  }

  logOut() {
    this.authService.logOut().then(() => {
      this.$state.reload();
    });
  }

  private redirectAfterLogin = () => {
    let state = this.returnTo.state();
    let params = this.returnTo.params();

    let options = angular.copy(this.returnTo.options());
    options.reload = true;

    this.$state.go(state, params, options);
  };
}

export class LoginPage implements ng.IComponentOptions {
  static selector = 'loginPage';
  static controller = LoginPageController;
  static template = require('./login.template.html');
  static bindings = {
    loggedAs: '<',
    returnTo: '<'
  };
}
