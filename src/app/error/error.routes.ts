import { StateProvider } from "@uirouter/angularjs";

import { States } from '../core/enums/route-states';

import { NotFoundPage } from './404.page';

export const routing = ($stateProvider: StateProvider) => {
  'ngInject';

  $stateProvider.state({
    name: States.NotFound,
    component: NotFoundPage.selector
  });
};
