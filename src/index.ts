// Polyfills and vendor files
import './polyfills';
import './vendor';

/**
 * Temporary Import angular
 * see: https://github.com/Microsoft/TypeScript/issues/10178
 */
import * as angular from 'angular';

// Global styles
import './index.scss';

// Module to be bootstrapped
import { moduleName as appModule } from './app/app.module';

// For production
/*
myApp.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}]);
*/

// Bootstrap the application using the imported moduleName
const bootstrapModuleName = angular
  .module('app.bootstrap', ['ngMaterial', 'ngMessages', 'ngAria', appModule])
  .config(
    (
      $compileProvider: ng.ICompileProvider,
      $mdIconProvider: ng.material.IIconProvider,
      $mdThemingProvider: ng.material.IThemingProvider
    ) => {
      // Disable comment and css class directives
      $compileProvider.commentDirectivesEnabled(false);
      $compileProvider.cssClassDirectivesEnabled(false);

      // Set theme
      $mdIconProvider
        .icon('filter', './assets/icons/filter.svg', 24)
        .icon('add', './assets/icons/add.svg', 24)
        .icon('edit', './assets/icons/edit.svg', 24)
        .icon('delete', './assets/icons/delete.svg', 24)
        .icon('chevron-right', './assets/icons/chevron-right.svg', 24)
        .icon('exit', './assets/icons/exit.svg', 24)
        .icon('plus-circle', './assets/icons/plus-circle.svg', 24)
        .icon('close-circle', './assets/icons/close-circle.svg', 24);

      $mdThemingProvider
        .theme('default')
        .primaryPalette('blue')
        .accentPalette('red')
        .dark();
    }
  ).name;
