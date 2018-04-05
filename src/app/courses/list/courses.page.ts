import * as angular from 'angular';

import { CoursesService } from '../../core/services/courses.service';
import { Course } from '../../core/entities/course';

class CoursesPageController {
  courses: Course[];

  filter = '';

  filterModelOptions = {
    debounce: 450
  };

  isLoading = false;

  constructor(
    private coursesService: CoursesService,
    private $mdDialog: ng.material.IDialogService
  ) {
    'ngInject';
  }

  deleteCourse(event: MouseEvent, course: Course) {
    const config = this.$mdDialog
      .delete()
      .targetEvent(event)
      .entityName(course.name);

    this.$mdDialog
      .show(config)
      .then(() => {
        this.isLoading = true;
        this.coursesService
          .deleteCourse(course.id)
          .then((courses: Course[]) => {
            this.courses = courses;
          })
          .finally(() => {
            this.isLoading = false;
          });
      })
      .catch(angular.noop);
  }

  onFilterChange() {
    this.isLoading = true;
    this.coursesService
      .getCourses(this.filter)
      .then((courses: Course[]) => {
        this.courses = courses;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}

export class CoursesPage implements ng.IComponentOptions {
  static selector = 'coursesPage';
  static controller = CoursesPageController;
  static template = require('./courses.page.html');
  static bindings = {
    courses: '<',
    filter: '<'
  };
}
