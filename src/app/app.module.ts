import * as angular from 'angular';

import coreModule from './core/core.module';
import loginModule from './login/login.module';
import coursesModule from './courses/courses.module';

export const moduleName = angular.module('app', [
  coreModule,
  loginModule,
  coursesModule
]).name;
