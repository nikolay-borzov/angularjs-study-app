export function actFactory(controller: any, $rootScope: ng.IRootScopeService) {
  return function(action: Function) {
    // Bind action to controller context
    action.bind(controller)();
    $rootScope.$apply();
  };
}
