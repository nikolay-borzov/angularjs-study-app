class CourseUpdatePageController {}

export class CourseUpdatePage implements angular.IComponentOptions {
  static selector = 'courseUpdatePage';
  static controller = CourseUpdatePageController;
  static template = require('./course-update.page.html');
  static bindings = {
    id: '<'
  };
}
