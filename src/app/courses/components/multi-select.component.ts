import * as angular from 'angular';

class MultiSelectController {
  // Inputs
  ngModelCtrl: ng.INgModelController;
  idKey: string;
  nameKey: string;
  items: Array<any>;
  required: boolean;

  selected = Array<any>();
  available: Array<any>;

  isInvalid: boolean;

  constructor(
    private $timeout: ng.ITimeoutService,
    private $filter: ng.IFilterService
  ) {
    'ngInject';
  }

  $onInit() {
    const self = this;

    if (angular.isUndefined(this.idKey)) {
      this.idKey = 'id';
    }

    if (angular.isUndefined(this.nameKey)) {
      this.nameKey = 'name';
    }

    this.available = this.$filter('orderBy')(this.items, this.nameKey);

    this.$timeout(() => {
      let ids = self.ngModelCtrl.$viewValue || [];

      self.available.forEach((item: any) => {
        if (ids.includes(item[self.idKey])) {
          item.selected = true;
          self.selected.push(item);
        }
      });

      // this.validateModel();
    }, 0);
  }

  onAdd(id: any) {
    const index = this.getItemIndexById(id, this.available);
    const item = this.available[index];

    item.selected = true;
    this.selected.push(item);

    this.updateModel();
  }

  onRemove(id: any) {
    const index = this.getItemIndexById(id, this.selected);

    const sourceIndex = this.getItemIndexById(id, this.available);
    this.available[sourceIndex].selected = false;

    this.selected.splice(index, 1);

    this.updateModel();
  }

  private getItemIndexById(id: any, items: Array<any>) {
    return items.findIndex((item: any) => {
      return item[this.idKey] === id;
    });
  }

  private updateModel() {
    this.validateModel();

    const ids = this.selected.map((item: any) => item[this.idKey]);
    this.ngModelCtrl.$setViewValue(ids);
  }

  private validateModel() {
    if (this.required) {
      this.ngModelCtrl.$setValidity('required', this.selected.length > 0);
    }

    this.isInvalid = this.ngModelCtrl.$invalid;
  }
}

export class MultiSelect implements ng.IComponentOptions {
  static selector = 'multiSelect';
  static controller = MultiSelectController;
  static template = require('./multi-select.template.html');
  static require = {
    ngModelCtrl: 'ngModel',
    ngFormCtrl: '^^form'
  };
  static bindings = {
    label: '@',
    labelItems: '@',
    ngModel: '<',
    items: '<',
    idKey: '@',
    nameKey: '@',
    // Support for native attributes
    name: '@',
    required: '@',
    disabled: '@'
  };
}
