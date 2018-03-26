import { TransitionService, Transition, IStateMatch } from '@uirouter/core';

import { AuthService } from '../services/auth.service';
import { States } from '../enums/route-states';

export function authHook(
  $transitionsProvider: TransitionService /*,
  authService: AuthService*/
) {
  'ngInject';

  // All states without skipAuth = true require authentication
  const criteria = {
    to: (state: any) => (state.data && !state.data.skipAuth) || !state.data
  };

  function redirectToLogin(transition: Transition) {
    console.log('authHook');
    const authService = transition.injector().get('authService');
    const $state = transition.router.stateService;

    if (!authService.isAuthenticated()) {
      // Do not change location so that user see where he will return after log in
      return $state.target(States.Login, undefined, { location: false });
    }
  }

  $transitionsProvider.onBefore(criteria, redirectToLogin);
}
