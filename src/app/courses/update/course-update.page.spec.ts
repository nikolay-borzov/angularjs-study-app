import * as angular from 'angular';
import 'angular-mocks';

import { CourseUpdatePage } from './course-update.page';

describe('CourseUpdatePage', () => {
  let ctrl: any;

  const coursesService = jasmine.createSpyObj('coursesService', [
    'createCourse'
  ]);
  const $state = jasmine.createSpyObj('$state', ['go']);

  beforeEach(() => {
    angular
      .module('app', [])
      .component(CourseUpdatePage.selector, CourseUpdatePage);

    angular.mock.module('app');
  });

  beforeEach(() =>
    inject(($componentController: any) => {
      ctrl = $componentController(CourseUpdatePage.selector, {
        coursesService,
        $state
      });
    }));

  it('should exist', () => {
    expect(ctrl).toBeDefined();
  });
});
