import { App } from './components/app/app.component';

export const routing = (
  $stateProvider: ng.ui.IStateProvider,
  $urlRouterProvider: ng.ui.IUrlRouterProvider
) => {
  'ngInject';
  $stateProvider.state({
    name: 'app',
    redirectTo: 'courses',
    component: App.selector
  });
  // TODO: Set not found page
  $urlRouterProvider.otherwise('/login');
};
