import { StateService } from '@uirouter/core';

import { CoursePageController } from '../course.controller';
import { CoursesService } from '../../core/services/courses.service';
import { Course } from '../../core/entities/course';

class CourseCreatePageController extends CoursePageController {
  constructor(coursesService: CoursesService, $state: StateService) {
    'ngInject';

    super(coursesService, $state);
  }

  save(model: Course) {
    this.isLoading = true;
    this.coursesService
      .createCourse(model)
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

export class CourseCreatePage implements angular.IComponentOptions {
  static selector = 'courseCreatePage';
  static controller = CourseCreatePageController;
  static template = require('./course-create.template.html');
  static bindings = {
    authors: '<'
  };
}
