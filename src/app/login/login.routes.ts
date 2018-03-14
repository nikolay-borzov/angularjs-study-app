import { LoginPage } from './login.page';

export const routing = ($stateProvider: angular.ui.IStateProvider) => {
  'ngInject';

  $stateProvider.state({
    name: 'login',
    url: '/login',
    component: LoginPage.selector
  });
};
