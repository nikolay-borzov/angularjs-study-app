// Temporary, until https://github.com/Microsoft/TypeScript/issues/10178 is implemented
import * as angular from 'angular';

import coreModule from './core/core.module';
import pageData from './page-data/page-data.module';
import loginModule from './login/login.module';
import coursesModule from './courses/courses.module';

export const moduleName = angular.module('app', [
  coreModule,
  pageData,
  loginModule,
  coursesModule
]).name;
