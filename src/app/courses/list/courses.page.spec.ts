import * as angular from 'angular';
import 'angular-mocks';

import { actFactory } from '../../../tests/component-helpers';

import { CoursesPage } from './courses.page';
import { Course } from '../../core/entities/course';

describe('CoursesPage', () => {
  let ctrl: any;

  let $q: ng.IQService;
  let $rootScope: ng.IRootScopeService;

  const coursesService = jasmine.createSpyObj('coursesService', [
    'getCourses',
    'deleteCourse'
  ]);
  const $mdDialog = jasmine.createSpyObj('$mdDialog', ['delete', 'show']);

  const bindings = {
    courses: [new Course()],
    filter: 'query'
  };

  let act: Function;

  beforeEach(() => {
    angular.module('app', []).component(CoursesPage.selector, CoursesPage);

    angular.mock.module('app');
  });

  beforeEach(() =>
    inject(
      (
        $componentController: ng.IComponentControllerService,
        _$q_: ng.IQService,
        _$rootScope_: ng.IRootScopeService
      ) => {
        $q = _$q_;
        $rootScope = _$rootScope_;

        ctrl = $componentController(
          CoursesPage.selector,
          {
            coursesService,
            $mdDialog
          },
          bindings
        );

        act = actFactory(ctrl, $rootScope);
      }
    )
  );

  it('should exist', () => {
    expect(ctrl).toBeDefined();
  });

  it('reloads courses on filter change', () => {
    const filteredCourses = [{ name: 'Course #1' } as Course];
    coursesService.getCourses.and.returnValue($q.resolve(filteredCourses));

    ctrl.filter = 'Co';
    act(ctrl.onFilterChange);

    expect(coursesService.getCourses).toHaveBeenCalledWith(ctrl.filter);
    expect(ctrl.courses).toBe(filteredCourses);
  });

  it('reloads courses on filter clear', () => {
    coursesService.getCourses.and.returnValue($q.resolve());

    act(ctrl.clearFilter);

    expect(coursesService.getCourses).toHaveBeenCalledWith('');
  });
});
