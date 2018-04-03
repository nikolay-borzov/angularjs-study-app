import * as angular from 'angular';

import { CoursesService } from '../../core/services/courses.service';
import { Course } from '../../core/entities/course';

class CoursesPageController {
  courses: Course[];

  filter: string;

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

  deleteCourse(event: MouseEvent) {
    /*const confirm = this.$mdDialog
      .confirm()
      .title('Would you like to delete your debt?')
      .textContent('All of the banks have agreed to forgive you your debts.')
      .ariaLabel('Lucky day')
      .targetEvent(event)
      .ok('Please do it!')
      .cancel('Sounds like a scam');

    this.$mdDialog.show(confirm);*/

    this.$mdDialog.show({
      // template: require('../../core/templates/delete-dialog.html'),
      templateUrl: 'delete-dialog',
      parent: angular.element(document.body),
      targetEvent: event
    });
  }

  onFilterChange() {
    this.isLoading = true;
    this.coursesService
      .getCourses(this.filter)
      .then((courses: Course[]) => {
        this.courses = courses;
        this.isLoading = false;
      })
      .catch(() => {
        this.isLoading = false;
      });
  }
}

export class CoursesPage implements angular.IComponentOptions {
  static selector = 'coursesPage';
  static controller = CoursesPageController;
  static template = require('./courses.page.html');
  static bindings = {
    courses: '<',
    filter: '<'
  };
}
