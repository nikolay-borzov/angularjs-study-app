import * as angular from 'angular';
import 'angular-mocks';

import { LoginPage } from './login.page';
import { AuthService } from '../core/services/auth.service';

describe('LoginPage', () => {
  let ctrl: any;

  let $q: ng.IQService;
  let $rootScope: ng.IRootScopeService;

  let authService = jasmine.createSpyObj('authService', ['logIn', 'logOut']);
  let $state = jasmine.createSpyObj('$state', ['go', 'reload']);

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

        ctrl = $componentController(LoginPage.selector, {
          authService,
          $state
        });
      }
    )
  );

  it('should exist', () => {
    expect(ctrl).toBeDefined();
  });

  describe('on log in', () => {
    beforeEach(() => {
      authService.logIn.and.returnValue($q.resolve());
    });

    it('should call `authService.logIn`', () => {
      const params = { login: 'login', password: 'passsword' };

      ctrl.logIn(params);

      expect(authService.logIn).toHaveBeenCalledWith(
        params.login,
        params.password
      );
    });

    it('should redirect to courses on success', () => {
      ctrl.logIn({ login: 'login' });
      $rootScope.$apply();

      expect($state.go).toHaveBeenCalledWith('courses');
    });

    it('should set `loginError` on fail ', () => {
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

    it('should call `authService.logOut`', () => {
      ctrl.logOut();

      expect(authService.logOut).toHaveBeenCalled();
    });

    it('should reload page', () => {
      ctrl.logOut();
      $rootScope.$apply();

      expect($state.reload).toHaveBeenCalled();
    });
  });
});
