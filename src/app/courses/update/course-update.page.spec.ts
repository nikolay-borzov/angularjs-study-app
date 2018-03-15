import * as angular from 'angular';
import 'angular-mocks';

import { CourseUpdatePage } from './course-update.page';

describe('CourseCreatePage', () => {
  let ctrl: any;

  beforeEach(() => {
    angular
      .module('app', [])
      .component(CourseUpdatePage.selector, CourseUpdatePage);

    angular.mock.module('app');
  });

  beforeEach(() =>
    angular.mock.inject(($componentController: any) => {
      ctrl = $componentController(CourseUpdatePage.selector);
    })
  );

  it('should exist', () => {
    expect(ctrl).toBeDefined();
  });
});
