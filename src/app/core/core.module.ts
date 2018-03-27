// Temporary, until https://github.com/Microsoft/TypeScript/issues/10178 is implemented
import * as angular from 'angular';

import { IAppConfig } from './interfaces/app-config';

// Components
import { App } from './components/app/app.component';
import { Breadcrumbs } from './components/breadcrumbs/breadcrumbs.component';
import { LoginWidget } from './components/login-widget/login-widget.component';

// Services
import { AuthService } from './services/auth.service';
import { CoursesService } from './services/courses.service';

// Filters
import durationFilter from './filters/duration.filter';

// Configuration
import { configuration } from './core.configuration';
import { routing } from './core.routes';
import { authHook } from './config-hooks/auth.hook';
import { pageDataHook } from './config-hooks/page-data.hook';

export default angular
  .module('app.core', ['ui.router'])
  .constant('appConfig', {
    apiUrl: 'http://localhost:3000'
  } as IAppConfig)
  // Components
  .component(Breadcrumbs.selector, Breadcrumbs)
  .component(LoginWidget.selector, LoginWidget)
  .component(App.selector, App)
  // Services
  .service(AuthService.selector, AuthService)
  .service(CoursesService.selector, CoursesService)
  // Filters
  .filter(durationFilter.selector, durationFilter.factory)
  // Configuration
  .config(configuration)
  .config(authHook)
  .config(pageDataHook)
  .config(routing).name;
