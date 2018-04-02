import { Transition } from '@uirouter/core';
import { StateProvider } from '@uirouter/angularjs';

import { CoursesPage } from './list/courses.page';
import { CourseCreatePage } from './create/course-create.page';
import { CourseUpdatePage } from './update/course-update.page';

import { CoursesService } from '../core/services/courses.service';
import { AuthorsService } from '../core/services/authors.service';

import { Course } from '../core/entities/course';

import { States } from '../core/enums/route-states';

export const routing = ($stateProvider: StateProvider) => {
  'ngInject';

  const resolvables = {
    authors: function(authorsService: AuthorsService) {
      'ngInject';
      return authorsService.getAuthors();
    }
  };

  // View list
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

  // Create
  $stateProvider.state({
    name: States.CourseCreate,
    parent: States.Courses,
    url: '/new',
    views: {
      '@': {
        component: CourseCreatePage.selector
      }
    },
    resolve: {
      authors: resolvables.authors,

      title: () => 'Create Course'
    }
  });

  // Update
  $stateProvider.state({
    name: States.CourseUpdate,
    parent: States.Courses,
    url: '/{courseId}',
    views: {
      '@': {
        component: CourseUpdatePage.selector
      }
    },
    resolve: {
      course: function(
        $transition$: Transition,
        coursesService: CoursesService
      ) {
        'ngInject';
        const id = $transition$.params().courseId;
        return coursesService.getCourse(id);
      },

      authors: resolvables.authors,

      title: function(course: Course) {
        return course ? `Edit "${course.name}"` : 'Not found';
      }
    }
  });
};
