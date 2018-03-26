import { App } from './components/app/app.component';
import { States } from '../core/enums/route-states';
import { UrlService } from '@uirouter/core';

export const routing = (
  $stateProvider: ng.ui.IStateProvider,
  $urlServiceProvider: UrlService
) => {
  'ngInject';

  // Root state
  $stateProvider.state({
    name: 'app',
    redirectTo: States.Courses,
    component: App.selector
  });

  $urlServiceProvider.rules.otherwise({ state: States.Courses });
};
