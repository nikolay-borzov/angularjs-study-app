import { LoginPage } from './login.page';
import { States } from '../core/enums/route-states';
import { AuthService } from '../core/services/auth.service';

export const routing = ($stateProvider: ng.ui.IStateProvider) => {
  'ngInject';

  $stateProvider.state({
    name: States.Login,
    url: '/login',
    component: LoginPage.selector,
    data: {
      title: 'Sign in'
    },
    resolve: {
      loggedAs: function(authService: AuthService) {
        return authService.getLoggedUser();
      }
    }
  });
};
