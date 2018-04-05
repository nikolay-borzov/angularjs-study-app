import * as angular from 'angular';
import 'angular-mocks';
import { StateDeclaration, RawParams, TransitionOptions } from '@uirouter/core';

import { LoginPage } from './login.page';
import { AuthService } from '../core/services/auth.service';

fdescribe('LoginPage', () => {
  let ctrl: any;

  let $q: ng.IQService;
  let $rootScope: ng.IRootScopeService;

  let authService = jasmine.createSpyObj('authService', ['logIn', 'logOut']);
  let $state = jasmine.createSpyObj('$state', ['go', 'reload']);

  const bindings = {
    returnTo: jasmine.createSpyObj('returnTo', ['state', 'params', 'options'])
  };

  beforeEach(() => {
    angular.module('app', []).component(LoginPage.selector, LoginPage);

    angular.mock.module('app');
  });

  beforeEach(() =>
    angular.mock.inject(
      (
        $componentController: ng.IControllerService,
        _$q_: ng.IQService,
        _$rootScope_: ng.IRootScopeService
      ) => {
        $q = _$q_;
        $rootScope = _$rootScope_;

        ctrl = $componentController(
          LoginPage.selector,
          {
            authService,
            $state
          },
          bindings
        );
      }
    )
  );

  it('exists', () => {
    expect(ctrl).toBeDefined();
  });

  describe('on log in', () => {
    beforeEach(() => {
      authService.logIn.and.returnValue($q.resolve());
    });

    it('calls `authService.logIn`', () => {
      const params = { login: 'login', password: 'passsword' };

      ctrl.logIn(params);

      expect(authService.logIn).toHaveBeenCalledWith(
        params.login,
        params.password
      );
    });

    it('redirects to state specified in `returnTo` on success', () => {
      let state = {
        name: 'someState'
      } as StateDeclaration;
      let params = {} as RawParams;
      let options = { reload: false } as TransitionOptions;

      bindings.returnTo.state.and.returnValue(state);
      bindings.returnTo.params.and.returnValue(params);
      bindings.returnTo.options.and.returnValue(options);

      ctrl.logIn({ login: 'login' });
      $rootScope.$apply();

      expect($state.go).toHaveBeenCalledWith(state, params, { reload: true });
    });

    it('sets `loginError` on fail ', () => {
      authService.logIn.and.returnValue($q.reject());

      ctrl.logIn({ login: 'wronglogin' });
      $rootScope.$apply();

      expect($state.go).not.toHaveBeenCalled();
      expect(ctrl.loginError).toBeTruthy();
    });
  });

  describe('on log out', () => {
    beforeEach(() => {
      authService.logOut.and.returnValue($q.resolve());
    });

    it('calls `authService.logOut`', () => {
      ctrl.logOut();

      expect(authService.logOut).toHaveBeenCalled();
    });

    it('reloads page', () => {
      ctrl.logOut();
      $rootScope.$apply();

      expect($state.reload).toHaveBeenCalled();
    });
  });
});
