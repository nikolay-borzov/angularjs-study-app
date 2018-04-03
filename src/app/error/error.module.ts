import * as angular from 'angular';

// Pages
import { NotFoundPage } from './404.page';

// Routing
import { routing } from './error.routes';

export default angular.module('app.error', ['ui.router'])
  .component(NotFoundPage.selector, NotFoundPage)
  .config(routing).name;
