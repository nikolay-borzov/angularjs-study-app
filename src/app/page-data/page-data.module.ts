import * as angular from 'angular';
import { Transition, TransitionService, IStateMatch } from '@uirouter/core';

import { IExpandable } from '../core/interfaces/expandable';

/**
 * Handles page related metadata
 */
export default angular
  .module('app.pageData', [])
  .run(
    (
      $rootScope: ng.IRootScopeService & IExpandable,
      $transitions: TransitionService
    ) => {
      'ngInject';

      // TODO: Perhaps it's better to assume that every state has a title
      const criteriaObj = {
        to: (state: any) => state.resolve && state.resolve.title
      };

      $transitions.onSuccess(criteriaObj, (transition: Transition) => {
        const toState = transition.to();

        let title = transition.injector().get('title');

        $rootScope.page = { title };
      });
    }
  ).name;
