// Polyfills and vendor files
import './polyfills';
import './vendor';

// Global styles
import './index.scss';

/**
 * Temporary Import angular
 * see: https://github.com/Microsoft/TypeScript/issues/10178
 */
import * as angular from 'angular';

// Module to be bootstrapped
import { moduleName as appModule } from './app/app.module';

// Bootstrap the application using the imported moduleName
const bootstrapModuleName = angular.module('application.bootstrap', [appModule])
  .name;
