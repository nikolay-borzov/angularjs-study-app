import { Transition, TransitionService } from '@uirouter/core';

import { IEventSubscriber } from '../../interfaces/event-subscriber';
import { IExpandable } from '../../interfaces/expandable';

class BreadcrumbsController implements IEventSubscriber {
  offFunctions: Function[] = [];

  title: string;

  constructor(
    private $rootScope: ng.IRootScopeService & IExpandable,
    private $transitions: TransitionService
  ) {}

  $onInit() {
    this.offFunctions.push(
      this.$transitions.onSuccess({}, (transition: Transition) => {
        this.title = this.$rootScope.page.title;
      })
    );
  }

  $onDestroy() {
    this.offFunctions.forEach((off: Function) => {
      off();
    });
  }
}

export class Breadcrumbs implements ng.IComponentOptions {
  static selector = 'breadcrumbs';
  static controller = BreadcrumbsController;
  static template = require('./breadcrumbs.template.html');
}
