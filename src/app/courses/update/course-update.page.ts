import { StateService } from '@uirouter/core';

import { CoursePageController } from '../course.controller';
import { CoursesService } from '../../core/services/courses.service';
import { Course } from '../../core/entities/course';

class CourseUpdatePageController extends CoursePageController {
  course: Course;

  isLoading = false;

  constructor(coursesService: CoursesService, $state: StateService) {
    'ngInject';

    super(coursesService, $state);
  }

  save(model: Course) {
    this.isLoading = true;
    this.coursesService
      .updateCourse(model)
      .then(this.afterSave)
      .catch((error: any) => {
        // TODO: Handle error rightly
        console.log('Error occured', error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}

export class CourseUpdatePage implements ng.IComponentOptions {
  static selector = 'courseUpdatePage';
  static controller = CourseUpdatePageController;
  static template = require('./course-update.template.html');
  static bindings = {
    course: '<',
    authors: '<'
  };
}
