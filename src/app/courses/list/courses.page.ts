import { CoursesService } from '../../core/services/courses.service';
import { Course } from '../../core/entities/course';

class CoursesPageController {
  courses: Course[];

  filter: string;

  filterModelOptions = {
    debounce: 450
  };

  isLoading = false;

  constructor(private coursesService: CoursesService) {
    'ngInject';
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
