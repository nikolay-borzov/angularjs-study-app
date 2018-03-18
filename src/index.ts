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
      // TODO: Specify necessary icons
      $mdIconProvider
        .defaultIconSet('./assets/svg/avatars.svg', 128)
        .icon('menu', './assets/svg/menu.svg', 24)
        .icon('share', './assets/svg/share.svg', 24)
        .icon('google_plus', './assets/svg/google_plus.svg', 24)
        .icon('hangouts', './assets/svg/hangouts.svg', 24)
        .icon('twitter', './assets/svg/twitter.svg', 24)
        .icon('phone', './assets/svg/phone.svg', 24);

      $mdThemingProvider
        .theme('default')
        .primaryPalette('blue')
        .accentPalette('red')
        .dark();
    }
  ).name;
