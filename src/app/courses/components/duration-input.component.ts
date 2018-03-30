class DurationInputController {
  ngModelCtrl: ng.INgModelController;

  value: number;

  $onInit() {
    this.ngModelCtrl.$formatters.push(this.formatValue);

    this.ngModelCtrl.$render = () => {
      this.value = this.ngModelCtrl.$viewValue;
    };
  }

  onChange() {
    this.ngModelCtrl.$setViewValue(this.value);
  }

  private formatValue(value: any) {
    return parseInt(value || 0, 10);
  }
}

export class DurationInput implements ng.IComponentOptions {
  static selector = 'durationInput';
  static controller = DurationInputController;
  static template = require('./duration-input.template.html');
  static require = {
    ngModelCtrl: 'ngModel',
    ngFormCtrl: '^^form'
  };
  static transclude = {
    'ng-messages': '?durationInputErrors'
  };
  static bindings = {
    ngModel: '<',
    label: '@',
    // Support for native attributes
    name: '@',
    required: '@', // Requires `required`
    disabled: '@' // Requires `disabled="disabled"`
  };
}
