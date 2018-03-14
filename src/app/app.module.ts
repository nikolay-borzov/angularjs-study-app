// Temporary, until https://github.com/Microsoft/TypeScript/issues/10178 is implemented
import * as angular from 'angular';

import coreModule from './core/core.module';
import loginModule from './login/login.module';

export const moduleName = angular.module('app', [coreModule, loginModule]).name;
