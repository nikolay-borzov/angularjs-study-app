import * as angular from 'angular';
import 'angular-mocks';

import { CoursesPage } from './courses.page';

describe('CoursesPage', () => {
  let ctrl: any;

  beforeEach(() => {
    angular.module('app', []).component(CoursesPage.selector, CoursesPage);

    angular.mock.module('app');
  });

  beforeEach(() =>
    angular.mock.inject(($componentController: any) => {
      ctrl = $componentController(CoursesPage.selector);
    })
  );

  it('should exist', () => {
    expect(ctrl).toBeDefined();
  });
});
