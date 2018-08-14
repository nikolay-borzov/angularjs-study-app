import * as angular from 'angular';
import { StateService } from '@uirouter/angularjs';

import '../../tests/route-core';
import {
  goToUrlFactory,
  resolveFactory,
  getResolvableFactory,
  specs
} from '../../tests/route-helpers';

import { Course } from '../core/entities/course';
import { Author } from '../core/entities/author';

describe('courses routes', () => {
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

  const course = { name: 'Some course' } as Course;

  function mockServices($provide: ng.auto.IProvideService) {
    $provide.factory('$transition$', () => $transition$);
    $provide.factory('authorsService', () => authorsService);
    $provide.factory('coursesService', () => coursesService);
    $provide.factory('course', () => course);
  }

  let resolve: Function;
  let getResolvable: Function;

  beforeEach(() => {
    angular.mock.module('app.courses', mockServices);
  });

  beforeEach(inject((
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
  }));

  describe('list', () => {
    let goToListPage: Function;
    let query = 'query';

    beforeEach(() => {
      goToListPage = goToUrlFactory($location, $rootScope, '/courses');
      $transition$.params.and.returnValue({ q: query });
    });

    specs.navigatesToState('courses', () => ({ goTo: goToListPage, $state }));

    specs.setsTitle(() => ({ goTo: goToListPage, resolve }));

    it('requests courses', () => {
      const courses = [new Course()];
      coursesService.getCourses.and.returnValue(courses);

      goToListPage();

      expect(resolve('courses')).toBe(courses);
      expect(coursesService.getCourses).toHaveBeenCalledWith(query);
    });

    it(`sets 'filter' from transition params`, () => {
      goToListPage();

      expect(resolve('filter')).toBe(query);
    });
  });

  describe('create', () => {
    let goToCreatePage: Function;

    beforeEach(function() {
      goToCreatePage = goToUrlFactory($location, $rootScope, '/courses/new');
    });

    specs.navigatesToState('course-create', () => ({
      goTo: goToCreatePage,
      $state
    }));

    specs.setsTitle(() => ({ goTo: goToCreatePage, resolve }));

    it(`requests authors`, () => {
      const authors = [new Author()];
      authorsService.getAuthors.and.returnValue(authors);

      goToCreatePage();

      expect(resolve('authors')).toBe(authors);
    });
  });

  describe('update', () => {
    let goToUpdatePage: Function;
    const courseId = 1;

    beforeEach(() => {
      goToUpdatePage = goToUrlFactory(
        $location,
        $rootScope,
        `/courses/${courseId}`
      );
      $transition$.params.and.returnValue({ courseId });
      coursesService.getCourse.and.returnValue(course);
    });

    specs.navigatesToState('course-update', () => ({
      goTo: goToUpdatePage,
      $state
    }));

    specs.setsTitle(() => ({ goTo: goToUpdatePage, resolve }), course.name);

    it('requests course by id', () => {
      coursesService.getCourse.and.returnValue(course);

      goToUpdatePage();

      expect(resolve('course')).toBe(course);
      expect(coursesService.getCourse).toHaveBeenCalledWith(courseId);
    });
  });
});
