import * as angular from 'angular';
import 'angular-mocks';

import { LoginPage } from './login.page';
import { AuthService } from '../core/services/auth.service';

describe('LoginPage', () => {
  let ctrl: any;

  let $q: ng.IQService;
  let $rootScope: ng.IRootScopeService;

  let authService = {
    logIn: jasmine.createSpy('logIn').and.callFake((login: string) => {
      const deferred = $q.defer();

      if (login === 'login') {
        deferred.resolve();
      } else {
        deferred.reject();
      }

      return deferred.promise;
    })
  };

  let $state = {
    go: jasmine.createSpy('go')
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

  it('should call `authService.logIn` on form log in', () => {
    const params = { login: 'login', password: 'passsword' };

    ctrl.logIn(params);

    expect(authService.logIn).toHaveBeenCalledWith(
      params.login,
      params.password
    );
  });

  it('should redirect to courses on success ', () => {
    const params = { login: 'login' };

    ctrl.logIn(params);
    $rootScope.$apply();

    expect($state.go).toHaveBeenCalledWith('courses');
  });

  it('should set `loginError` on fail ', () => {
    const params = { login: 'wronglogin' };

    ctrl.logIn(params);
    $rootScope.$apply();

    expect($state.go).not.toHaveBeenCalled();
    expect(ctrl.loginError).toBeTruthy();
  });
});
