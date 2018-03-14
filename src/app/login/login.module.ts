// Temporary, until https://github.com/Microsoft/TypeScript/issues/10178 is implemented
import * as angular from 'angular';

// Components
import { LoginForm } from './login-form.component';

// Pages
import { LoginPage } from './login.page';

// Routing
import { routing } from './login.routes';

export default angular
  .module('app.login', ['ui.router'])
  // Components
  .component(LoginForm.selector, LoginForm)
  // Pages
  .component(LoginPage.selector, LoginPage)

  // Services

  // Routes
  .config(routing).name;
