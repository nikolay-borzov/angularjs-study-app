import { UrlService } from '@uirouter/core';
import { StateProvider } from '@uirouter/angularjs';

import { App } from './components/app/app.component';
import { States } from '../core/enums/route-states';

export const routing = (
  $stateProvider: StateProvider,
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
