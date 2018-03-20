describe('login route', () => {
  let $state: ng.ui.IStateService;
  let $location: ng.ILocationService;
  let $httpBackend: ng.IHttpBackendService;

  let authService = jasmine.createSpyObj('authService', ['getLoggedUser']);

  function mockServices($provide: ng.auto.IProvideService) {
    $provide.factory('authService', () => authService);
  }

  function injectServices($injector: ng.auto.IInjectorService) {
    $state = $injector.get('$state');
    $location = $injector.get('$location');
    $httpBackend = $injector.get('$httpBackend');
  }

  // function setUp() {}

  function goTo(url: string) {
    $location.url(url);
    $httpBackend.flush();
  }

  beforeEach(function() {
    angular.module('app', ['ui.router'], mockServices);
    angular.mock.module('app');
    inject(injectServices);
    // setUp();
  });

  fit('should request logged user', () => {
    authService.getLoggedUser.and.returnValue({ name: 'John Doe' });

    goTo('/login');

    expect(authService.getLoggedUser).toHaveBeenCalled();
    expect($state.current.name).toBe('login');
  });
});
