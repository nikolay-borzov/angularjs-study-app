// Temporary, until https://github.com/Microsoft/TypeScript/issues/10178 is implemented
import * as angular from 'angular';

import { IAppConfig } from './interfaces/app-config';

// Components
import { App } from './components/app/app.component';
import { LoginWidget } from './components/login-widget/login-widget.component';

// Services
import { AuthService } from './services/auth.service';

// Configuration
import { configuration } from './core.configuration';
import { routing } from './core.routes';

export default angular
  .module('app.core', ['ui.router'])
  .constant('appConfig', {
    apiUrl: 'http://localhost:3000'
  } as IAppConfig)
  // Components
  .component(LoginWidget.selector, LoginWidget)
  .component(App.selector, App)
  // Services
  .service(AuthService.selector, AuthService)
  // Configuration
  .config(configuration)
  .config(routing).name;
