import { Transition } from '@uirouter/core';

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
      skipAuth: true
    },
    resolve: {
      title: () => 'Sign in',
      loggedAs: function(authService: AuthService) {
        'ngInject';
        return authService.getLoggedUser();
      },
      // Set state to return to after log in
      returnTo: function($transition$: Transition) {
        'ngInject';

        // If redirected from authHook return to the original state
        if ($transition$.redirectedFrom() != null) {
          return $transition$.redirectedFrom().targetState();
        }

        const $state = $transition$.router.stateService;

        // When directly activated return to the original state
        if ($transition$.from().name !== '') {
          return $state.target(
            $transition$.from(),
            $transition$.params('from')
          );
        }

        // Otherwise to courses page
        return $state.target(States.Courses);
      }
    }
  });
};
