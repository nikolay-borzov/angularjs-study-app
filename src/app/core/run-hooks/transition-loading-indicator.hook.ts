import { TransitionService } from '@uirouter/core';

import { Events } from '../enums/events';

/**
 * Shows/hides loading indicator during transitions
 */
export function transitionLoadingIndicator(
  $transitions: TransitionService,
  $rootScope: ng.IRootScopeService
) {
  'ngInject';

  $transitions.onStart({}, () => {
    $rootScope.$broadcast(Events.Loading, true);
  });
  $transitions.onFinish({}, () => {
    $rootScope.$broadcast(Events.Loading, false);
  });
}
