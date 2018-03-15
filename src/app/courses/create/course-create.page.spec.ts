import * as angular from 'angular';
import 'angular-mocks';

import { CourseCreatePage } from './course-create.page';

describe('CourseCreatePage', () => {
  let ctrl: any;

  beforeEach(() => {
    angular
      .module('app', [])
      .component(CourseCreatePage.selector, CourseCreatePage);

    angular.mock.module('app');
  });

  beforeEach(() =>
    angular.mock.inject(($componentController: any) => {
      ctrl = $componentController(CourseCreatePage.selector);
    })
  );

  it('should exist', () => {
    expect(ctrl).toBeDefined();
  });
});
