import { Course } from '../../core/entities/course';

class CourseUpdatePageController {
  course: Course;
}

export class CourseUpdatePage implements angular.IComponentOptions {
  static selector = 'courseUpdatePage';
  static controller = CourseUpdatePageController;
  static template = require('./course-update.page.html');
  static bindings = {
    course: '<'
  };
}
