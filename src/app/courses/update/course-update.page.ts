import * as angular from 'angular';
import { StateService } from '@uirouter/core';

import { States } from '../../core/enums/route-states';
import { Course } from '../../core/entities/course';
import { CoursesService } from '../../core/services/courses.service';

class CourseUpdatePageController {
  course: Course;

  isLoading = false;
  courseExists = false;

  constructor(
    private coursesService: CoursesService,
    private $state: StateService,
    private $timeout: ng.ITimeoutService
  ) {
    'ngInject';
  }

  $onInit() {
    const self = this;

    this.courseExists = angular.isDefined(this.course);

    if (!this.courseExists) {
      this.$timeout(() => {
        self.$state.go(States.Courses);
      }, 3000);
    }
  }

  save(model: Course) {
    this.isLoading = true;
    this.coursesService
      .updateCourse(model)
      .then(() => {
        // TODO: Pass course id in order to highlight updated course
        this.$state.go(
          States.Courses,
          {},
          {
            // https://github.com/angular-ui/ui-router/issues/3399
            reload: true
          }
        );
      })
      .catch((error: any) => {
        // TODO: Handle error rightly
        console.log('Error occured', error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  goBack() {
    this.$state.go(States.Courses);
  }
}

export class CourseUpdatePage implements angular.IComponentOptions {
  static selector = 'courseUpdatePage';
  static controller = CourseUpdatePageController;
  static template = require('./course-update.template.html');
  static bindings = {
    course: '<',
    authors: '<'
  };
}
