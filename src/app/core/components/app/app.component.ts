import * as angular from 'angular';
import { IEventSubscriber } from '../../interfaces/event-subscriber';
import { Events } from '../../enums/events';

class AppController implements IEventSubscriber {
  isLoading = false;

  offFunctions: Array<Function> = [];

  constructor(private $scope: ng.IScope) {
    'ngInject';
  }

  $onInit() {
    // Show/hide loading indicator during transitions
    this.offFunctions.push(
      this.$scope.$on(Events.Loading, (event: any, isLoading: boolean) => {
        this.isLoading = isLoading;
      })
    );
  }

  $onDestroy() {
    this.offFunctions.forEach((off: Function) => {
      off();
    });
  }
}

export class App implements angular.IComponentOptions {
  static selector = 'app';
  static template = require('./app.template.html');
  static controller = AppController;
}
