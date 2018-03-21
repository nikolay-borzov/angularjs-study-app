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

// Bootstrap the application using the imported moduleName
const bootstrapModuleName = angular
  .module('app.bootstrap', ['ngMaterial', 'ngMessages', appModule])
  .config(
    (
      $mdIconProvider: ng.material.IIconProvider,
      $mdThemingProvider: ng.material.IThemingProvider
    ) => {
      // TODO: Consider moving assets to static folder outside src. See also webpack-dev.config.js
      $mdIconProvider
        .icon('filter', './assets/icons/filter.svg', 24)
        .icon('add', './assets/icons/add.svg', 24)
        .icon('edit', './assets/icons/edit.svg', 24)
        .icon('delete', './assets/icons/delete.svg', 24);

      $mdThemingProvider
        .theme('default')
        .primaryPalette('blue')
        .accentPalette('red')
        .dark();
    }
  ).name;
