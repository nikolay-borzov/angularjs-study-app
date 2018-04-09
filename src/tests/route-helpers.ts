import { StateService } from '@uirouter/core';

// http://nikas.praninskas.com/angular/2014/09/27/unit-testing-ui-router-configuration/

export function goToUrlFactory(
  $location: ng.ILocationService,
  $rootScope: ng.IRootScopeService,
  url?: string
) {
  return url
    ? function() {
        $location.url(url);
        $rootScope.$digest();
      }
    : function(url?: string) {
        $location.url(url);
        $rootScope.$digest();
      };
}

function getResolvableFunc($state: StateService, value: string) {
  return ($state.current.resolve as any)[value];
}

export function resolveFactory(
  $state: StateService,
  $injector: ng.auto.IInjectorService
) {
  return function(value: string) {
    return $injector.invoke(getResolvableFunc($state, value));
  };
}

export function getResolvableFactory($state: StateService) {
  return function(value: string) {
    return getResolvableFunc($state, value);
  };
}

export const specs = {
  hasTitle(getParams: () => { goTo: Function; resolve: Function }) {
    describe('', () => {
      let goTo: Function;
      let resolve: Function;

      beforeEach(() => {
        ({ goTo, resolve } = getParams());
      });

      it('sets page title', () => {
        goTo();

        expect(resolve('title')).toBeDefined();
      });
    });
  }
};
