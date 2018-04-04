import { CoursesService } from '../../core/services/courses.service';
import { Course } from '../../core/entities/course';

import { showDeleteDialog } from '../../core/dialogs/delete-dialog';

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

  deleteCourse(event: MouseEvent, course: Course) {
    // showDeleteDialog(this.$mdDialog, event, course.name)
    this.$mdDialog
      .show(this.$mdDialog.delete(event, course.name))
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
      .catch(() => {
        'Ku';
      });
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
