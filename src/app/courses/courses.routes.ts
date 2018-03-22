import { Transition } from '@uirouter/core';

import { CoursesPage } from './list/courses.page';
import { CourseCreatePage } from './create/course-create.page';
import { CourseUpdatePage } from './update/course-update.page';

import { CoursesService } from '../core/services/courses.service';

import { Course } from '../core/entities/course';

import { States } from '../core/enums/route-states';

export const routing = ($stateProvider: angular.ui.IStateProvider) => {
  'ngInject';

  $stateProvider.state({
    name: States.Courses,
    url: '/courses?q',
    component: CoursesPage.selector,
    resolve: {
      title: () => 'Courses',
      courses: function(
        $transition$: Transition,
        coursesService: CoursesService
      ) {
        'ngInject';
        const filter = $transition$.params().q;
        return coursesService.getCourses(filter);
      },
      filter: function($transition$: Transition) {
        'ngInject';
        return $transition$.params().q;
      }
    }
  });

  $stateProvider.state({
    name: States.CourseCreate,
    url: '/courses/new',
    component: CourseCreatePage.selector,
    resolve: {
      title: () => 'Create Course'
    }
  });

  $stateProvider.state({
    name: States.CourseUpdate,
    url: '/courses/{courseId}',
    component: CourseUpdatePage.selector,
    resolve: {
      course: function(
        $transition$: Transition,
        coursesService: CoursesService
      ) {
        'ngInject';
        const id = $transition$.params().courseId;
        return coursesService.getCourse(id);
      },

      title: function(course: Course) {
        'ngInject';
        return `Edit "${course.name}"`;
      }
    }
  });
};
