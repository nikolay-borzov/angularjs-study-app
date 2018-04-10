import * as angular from 'angular';
import { TargetState, StateService } from '@uirouter/angularjs';

import '../../tests/route-core';
import {
  goToUrlFactory,
  resolveFactory,
  getResolvableFactory,
  specs
} from '../../tests/route-helpers';

describe('login route', () => {
  let $state: StateService;
  let $location: ng.ILocationService;
  let $rootScope: ng.IRootScopeService;
  let $injector: ng.auto.IInjectorService;

  let authService = jasmine.createSpyObj('authService', ['getLoggedUser']);
  let $transition$ = jasmine.createSpyObj('$transition$', [
    'redirectedFrom',
    'from',
    'params'
  ]);

  function mockServices($provide: ng.auto.IProvideService) {
    $provide.factory('authService', () => authService);
    $provide.factory('$transition$', () => $transition$);
  }

  let goToLoginPage: Function;
  let resolve: Function;
  let getResolvable: Function;

  beforeEach(() => {
    angular.mock.module('app.login', mockServices);
  });

  beforeEach(
    inject(
      (
        _$state_: StateService,
        _$location_: ng.ILocationService,
        _$rootScope_: ng.IRootScopeService,
        _$injector_: ng.auto.IInjectorService
      ) => {
        $state = _$state_;
        $location = _$location_;
        $rootScope = _$rootScope_;
        $injector = _$injector_;

        goToLoginPage = goToUrlFactory($location, $rootScope, '/login');
        resolve = resolveFactory($state, $injector);
        getResolvable = getResolvableFactory($state);
      }
    )
  );

  specs.navigatesToState('login', () => ({ goTo: goToLoginPage, $state }));

  specs.setsTitle(() => ({ goTo: goToLoginPage, resolve }));

  it('requests logged user', () => {
    const user = { name: 'John Doe' };
    authService.getLoggedUser.and.returnValue(user);

    goToLoginPage();

    expect(getResolvable('loggedAs')).toBeDefined();
    expect(authService.getLoggedUser).toHaveBeenCalled();
    expect(resolve('loggedAs')).toBe(user);
  });

  describe('resolveTo', () => {
    it('is set to `courses` by default', () => {
      let targetState = $state.target('courses');
      $transition$.from.and.returnValue({ name: '' });
      $transition$.redirectedFrom.and.returnValue(null);

      goToLoginPage();

      expect(resolve('returnTo')).toEqual(targetState);
    });

    it('is set to `redirected from` state', () => {
      let targetState = $state.target('some-state');
      $transition$.redirectedFrom.and.returnValue({
        targetState: () => targetState
      });

      goToLoginPage();

      expect(resolve('returnTo')).toBe(targetState);
    });

    it('is set to `from` state', () => {
      let state = { name: 'other-state' };
      let params = { param1: 'foo' };
      let targetState = $state.target(state, params);
      $transition$.redirectedFrom.and.returnValue(null);
      $transition$.from.and.returnValue(state);
      $transition$.params.and.returnValue(params);

      goToLoginPage();

      expect(resolve('returnTo')).toEqual(targetState);
      expect($transition$.params).toHaveBeenCalledWith('from');
    });
  });
});
