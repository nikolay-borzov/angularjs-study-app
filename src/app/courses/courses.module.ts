// Temporary, until https://github.com/Microsoft/TypeScript/issues/10178 is implemented
import * as angular from 'angular';

// Components

// Pages
import { CoursesPage } from './list/courses.page';
import { CourseCreatePage } from './create/course-create.page';
import { CourseUpdatePage } from './update/course-update.page';

// Routing
import { routing } from './courses.routes';

export default angular
  .module('app.courses', ['ui.router'])
  // Components

  // Pages
  .component(CoursesPage.selector, CoursesPage)
  .component(CourseCreatePage.selector, CourseCreatePage)
  .component(CourseUpdatePage.selector, CourseUpdatePage)
  // Services

  // Routes
  .config(routing).name;