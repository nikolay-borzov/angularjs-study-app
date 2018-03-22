import { Transition, TransitionService } from '@uirouter/core';

import { States } from '../../enums/route-states';
import { AuthService } from '../../services/auth.service';
import { User } from '../../entities/user';
import { IEventSubscriber } from '../../interfaces/event-subscriber';

class LoginWidgetController implements IEventSubscriber {
  isLogged = false;
  isLoginPage = false;
  userName: string;

  offFunctions: Array<Function> = [];

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
    this.offFunctions.push(
      this.$transitions.onSuccess({}, (transition: Transition) => {
        this.isLoginPage = transition.to().name === States.Login;
      })
    );

    // Listen to AuthService events
    this.offFunctions.push(
      this.$scope.$on(
        AuthService.events.logIn,
        (event: ng.IAngularEvent, user: User) => this.setUser(user)
      )
    );

    this.offFunctions.push(
      this.$scope.$on(AuthService.events.logOut, this.clearUser)
    );
  }

  $onDestroy() {
    this.offFunctions.forEach((off: Function) => {
      off();
    });
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

export class LoginWidget implements ng.IComponentOptions {
  static selector = 'loginWidget';
  static controller = LoginWidgetController;
  static template = require('./login-widget.component.html');
}
