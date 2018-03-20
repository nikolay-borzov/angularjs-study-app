import { Transition, TransitionService } from '@uirouter/core';

import { States } from '../../enums/route-states';
import { AuthService } from '../../services/auth.service';
import { User } from '../../entities/user';

class LoginWidgetController {
  isLogged = false;
  isLoginPage = false;
  userName: string;

  constructor(
    private authService: AuthService,
    private $scope: ng.IScope,
    private $state: ng.ui.IStateService,
    private $transitions: TransitionService
  ) {
    'ngInject';
  }

  $onInit() {
    this.isLogged = this.authService.isAuthenticated();

    if (this.isLogged) {
      this.userName = this.authService.getLoggedUser().name;
    }

    // Listen to page change
    this.$transitions.onSuccess({}, (transition: Transition) => {
      this.isLoginPage = transition.to().name === States.Login;
    });

    // Listen to AuthService events
    this.$scope.$on(
      AuthService.events.logIn,
      (event: ng.IAngularEvent, user: User) => this.setUser(user)
    );

    this.$scope.$on(AuthService.events.logOut, this.clearUser);
  }

  logOut() {
    this.authService.logOut();
  }

  private setUser(user: User) {
    this.userName = this.authService.getLoggedUser().name;
    this.isLogged = true;
  }

  private clearUser = () => {
    this.userName = '';
    this.isLogged = false;
  };
}

export class LoginWidget implements angular.IComponentOptions {
  static selector = 'loginWidget';
  static controller = LoginWidgetController;
  static template = require('./login-widget.component.html');
}
