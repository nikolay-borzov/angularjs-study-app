import * as angular from 'angular';
import '@uirouter/angularjs';

describe('login route', () => {
  let $state: ng.ui.IStateService;
  let $location: ng.ILocationService;
  let $rootScope: ng.IRootScopeService;
  let $injector: ng.auto.IInjectorService;

  let authService = jasmine.createSpyObj('authService', ['getLoggedUser']);

  function mockServices($provide: ng.auto.IProvideService) {
    $provide.factory('authService', () => authService);
  }

  function goToLoginPage() {
    $location.url('/login');
    $rootScope.$digest();
  }

  beforeEach(() => {
    angular.mock.module('app.login', mockServices);
  });

  beforeEach(
    inject(
      (
        _$state_: ng.ui.IStateService,
        _$location_: ng.ILocationService,
        _$rootScope_: ng.IRootScopeService,
        _$injector_: ng.auto.IInjectorService
      ) => {
        $state = _$state_;
        $location = _$location_;
        $rootScope = _$rootScope_;
        $injector = _$injector_;
      }
    )
  );

  it('should navigate to `login` state', () => {
    goToLoginPage();

    expect($state.current.name).toBe('login');
  });

  it('should request logged user', () => {
    const user = { name: 'John Doe' };
    authService.getLoggedUser.and.returnValue(user);

    goToLoginPage();

    expect($state.current.resolve.loggedAs).toBeDefined();
    expect(authService.getLoggedUser).toHaveBeenCalled();
    expect($injector.invoke($state.current.resolve.loggedAs)).toBe(user);
  });
});
