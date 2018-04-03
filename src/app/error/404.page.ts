import { StateService } from '@uirouter/core';

import { States } from '../core/enums/route-states';

class NotFoundPageController {
  constructor(
    private $state: StateService,
    private $timeout: ng.ITimeoutService
  ) {
    'ngInject';
  }

  $onInit() {
    const self = this;

    this.$timeout(() => {
      self.$state.go(States.Courses);
    }, 3500);
  }
}

export class NotFoundPage implements ng.IComponentOptions {
  static selector = 'notFoundPage';
  static controller = NotFoundPageController;
  static template = require('./404.template.html');
}
