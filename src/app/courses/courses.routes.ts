import { CoursesPage } from './list/courses.page';
import { CourseCreatePage } from './create/course-create.page';
import { CourseUpdatePage } from './update/course-update.page';
import { Transition } from '@uirouter/core';

export const routing = ($stateProvider: angular.ui.IStateProvider) => {
  'ngInject';

  $stateProvider.state({
    name: 'courses',
    url: '/courses',
    component: CoursesPage.selector
  });

  $stateProvider.state({
    name: 'course-create',
    url: '/courses/new',
    component: CourseCreatePage.selector
  });

  $stateProvider.state({
    name: 'course-update',
    url: '/courses/{courseId}',
    component: CourseUpdatePage.selector,
    resolve: {
      id: function($transition$: Transition): any {
        return $transition$.params().courseId;
      }
    }
  });
};
