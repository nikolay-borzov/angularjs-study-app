import * as angular from 'angular';
import {
  Transition,
  TransitionService,
  StateService,
  PathNode,
  Resolvable
} from '@uirouter/core';

import { IEventSubscriber } from '../../interfaces/event-subscriber';
import { IExpandable } from '../../interfaces/expandable';

interface IBreadcrumb {
  state: string;
  title: string;
}

class BreadcrumbsController implements IEventSubscriber {
  offFunctions: Function[] = [];

  title: string;

  breadcrumbs: IBreadcrumb[];

  constructor(
    private $rootScope: ng.IRootScopeService & IExpandable,
    private $transitions: TransitionService,
    private $state: StateService
  ) {
    'ngInject';
  }

  $onInit() {
    this.offFunctions.push(
      this.$transitions.onSuccess({}, this.setBreadcrumbs)
    );
  }

  $onDestroy() {
    this.offFunctions.forEach((off: Function) => {
      off();
    });
  }

  private setBreadcrumbs = (transition: Transition) => {
    // https://github.com/angular-ui/ui-router/issues/2946#issuecomment-242866755
    let toPathNodes = transition.treeChanges().to;
    let breadcrumbs = new Array<IBreadcrumb>();

    this.breadcrumbs = toPathNodes
      .map(this.getBreadcrumb)
      .filter(angular.identity);
  };

  private getBreadcrumb = (node: PathNode) => {
    let titleResolvable = node.resolvables.filter(
      (r: Resolvable) => r.token === 'title'
    )[0];

    return !titleResolvable
      ? null
      : ({
          title: titleResolvable.data,
          state: this.$state.href(node.state, {})
        } as IBreadcrumb);
  };
}

export class Breadcrumbs implements ng.IComponentOptions {
  static selector = 'breadcrumbs';
  static controller = BreadcrumbsController;
  static template = require('./breadcrumbs.template.html');
}
