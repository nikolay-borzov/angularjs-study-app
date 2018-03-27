import { TransitionService, Transition } from '@uirouter/core';

import { IExpandable } from '../interfaces/expandable';

export function pageDataHook($transitionsProvider: TransitionService) {
  'ngInject';

  const criteriaObj = {
    to: (state: any) => state.resolve && state.resolve.title
  };

  $transitionsProvider.onSuccess(criteriaObj, (transition: Transition) => {
    const toState = transition.to();

    let title = transition.injector().get('title') as string;
    const $rootScope = transition
      .injector()
      .get('$rootScope') as ng.IRootScopeService & IExpandable;

    $rootScope.page = { title };
  });
}
