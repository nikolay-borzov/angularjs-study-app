import { App } from './components/app/app.component';

export const routing = (
  $stateProvider: angular.ui.IStateProvider,
  $urlRouterProvider: angular.ui.IUrlRouterProvider
) => {
  'ngInject';
  $stateProvider.state({
    name: 'app',
    redirectTo: 'login',
    component: App.selector
  });
  // TODO: Set not found page
  $urlRouterProvider.otherwise('/login');
};
