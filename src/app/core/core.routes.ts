import { App } from './components/app/app.component';
import { States } from '../core/enums/route-states';

export const routing = (
  $stateProvider: ng.ui.IStateProvider,
  $urlRouterProvider: ng.ui.IUrlRouterProvider
) => {
  'ngInject';
  $stateProvider.state({
    name: 'app',
    redirectTo: States.Courses,
    component: App.selector
  });
  // TODO: Set not found page
  $urlRouterProvider.otherwise('/login');
};
