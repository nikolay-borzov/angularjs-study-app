class LoadingBlockController {}

export class LoadingBlock implements ng.IComponentOptions {
  static selector = 'loadingBlock';
  static controller = LoadingBlockController;
  static template = require('./loading-block.template.html');
  static bindings = {
    isLoading: '<'
  };
  static transclude = true;
}
