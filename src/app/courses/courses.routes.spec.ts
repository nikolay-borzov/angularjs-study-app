import * as angular from 'angular';
import { TargetState, StateService } from '@uirouter/angularjs';

import '../../tests/route-core';
import {
  goToUrlFactory,
  resolveFactory,
  getResolvableFactory,
  specs
} from '../../tests/route-helpers';

fdescribe('courses routes', () => {
  let $state: StateService;
  let $location: ng.ILocationService;
  let $rootScope: ng.IRootScopeService;
  let $injector: ng.auto.IInjectorService;

  let authorsService = jasmine.createSpyObj('authorsService', ['getAuthors']);
  let coursesService = jasmine.createSpyObj('coursesService', [
    'getCourses',
    'getCourse'
  ]);
  let $transition$ = jasmine.createSpyObj('$transition$', ['params']);

  function mockServices($provide: ng.auto.IProvideService) {
    $provide.factory('$transition$', () => $transition$);
    $provide.factory('authorsService', () => authorsService);
    $provide.factory('coursesService', () => coursesService);
  }

  let resolve: Function;
  let getResolvable: Function;

  beforeEach(() => {
    angular.mock.module('app.courses', mockServices);
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

        resolve = resolveFactory($state, $injector);
        getResolvable = getResolvableFactory($state);
      }
    )
  );

  describe('list', () => {
    let goToListPage: Function;

    beforeEach(() => {
      goToListPage = goToUrlFactory($location, $rootScope, '/courses');
    });

    it('navigates to `courses` state', () => {
      goToListPage();

      expect($state.current.name).toBe('courses');
    });

    specs.hasTitle(() => ({ goTo: goToListPage, resolve }));
  });

  fdescribe('create', function() {
    let goToCreatePage: Function;

    beforeEach(function() {
      goToCreatePage = goToUrlFactory($location, $rootScope, '/courses/new');
    });

    it('navigates to `course-create` state', () => {
      goToCreatePage();

      expect($state.current.name).toBe('course-create');
    });

    specs.hasTitle(() => ({ goTo: goToCreatePage, resolve }));
  });

  // TODO: Mock course loading
  xdescribe('update', () => {
    let goToUpdatePage: Function;

    beforeEach(() => {
      goToUpdatePage = goToUrlFactory($location, $rootScope, '/courses/1');
    });

    it('navigates to `course-update` state', () => {
      goToUpdatePage();

      expect($state.current.name).toBe('course-update');
    });

    specs.hasTitle(() => ({ goTo: goToUpdatePage, resolve }));
  });
});
