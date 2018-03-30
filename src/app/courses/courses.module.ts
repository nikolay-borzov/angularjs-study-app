import * as angular from 'angular';

// Components
import { DurationInput } from './components/duration-input.component';
import { CourseForm } from './components/course-form.component';

// Pages
import { CoursesPage } from './list/courses.page';
import { CourseCreatePage } from './create/course-create.page';
import { CourseUpdatePage } from './update/course-update.page';

// Routing
import { routing } from './courses.routes';

export default angular
  .module('app.courses', ['ui.router'])
  // Components
  .component(DurationInput.selector, DurationInput)
  .component(CourseForm.selector, CourseForm)
  // Pages
  .component(CoursesPage.selector, CoursesPage)
  .component(CourseCreatePage.selector, CourseCreatePage)
  .component(CourseUpdatePage.selector, CourseUpdatePage)
  // Services

  // Routes
  .config(routing).name;
