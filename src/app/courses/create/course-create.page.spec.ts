import * as angular from 'angular';
import 'angular-mocks';
import { StateService } from '@uirouter/angularjs';

import { CourseCreatePage } from './course-create.page';

describe('CourseCreatePage', () => {
  let ctrl: any;

  const coursesService = jasmine.createSpyObj('coursesService', [
    'createCourse'
  ]);
  const $state = jasmine.createSpyObj('$state', ['go']);

  beforeEach(() => {
    angular
      .module('app', [])
      .component(CourseCreatePage.selector, CourseCreatePage);

    angular.mock.module('app');
  });

  beforeEach(() =>
    inject(($componentController: ng.IComponentControllerService) => {
      ctrl = $componentController(CourseCreatePage.selector, {
        coursesService,
        $state
      });
    }));

  it('should exist', () => {
    expect(ctrl).toBeDefined();
  });
});
