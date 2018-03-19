import { LoginPage } from './login.page';

export const routing = ($stateProvider: ng.ui.IStateProvider) => {
  'ngInject';

  $stateProvider.state({
    name: 'login',
    url: '/login',
    component: LoginPage.selector
  });
};
