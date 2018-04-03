import * as angular from 'angular';

import coreModule from './core/core.module';
import errorModule from './error/error.module';
import loginModule from './login/login.module';
import coursesModule from './courses/courses.module';

export const moduleName = angular.module('app', [
  coreModule,
  errorModule,
  loginModule,
  coursesModule
]).name;
