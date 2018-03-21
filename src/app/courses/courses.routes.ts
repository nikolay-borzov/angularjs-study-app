import { Transition } from '@uirouter/core';

import { CoursesPage } from './list/courses.page';
import { CourseCreatePage } from './create/course-create.page';
import { CourseUpdatePage } from './update/course-update.page';

import { CoursesService } from '../core/services/courses.service';

import { States } from '../core/enums/route-states';

export const routing = ($stateProvider: angular.ui.IStateProvider) => {
  'ngInject';

  $stateProvider.state({
    name: States.Courses,
    url: '/courses?q',
    component: CoursesPage.selector,
    resolve: {
      courses: function(
        coursesService: CoursesService,
        $transition$: Transition
      ) {
        const filter = $transition$.params().q;
        return coursesService.getCourses(filter);
      },
      filter: function($transition$: Transition) {
        return $transition$.params().q;
      }
    }
  });

  $stateProvider.state({
    name: States.CourseCreate,
    url: '/courses/new',
    component: CourseCreatePage.selector
  });

  $stateProvider.state({
    name: States.CourseUpdate,
    url: '/courses/{courseId}',
    component: CourseUpdatePage.selector,
    resolve: {
      id: function($transition$: Transition): any {
        return $transition$.params().courseId;
      }
    }
  });
};
