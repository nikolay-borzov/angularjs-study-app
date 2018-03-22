/**
 * For controller classes that use $scope.on, $transitions.onSuccess and other
 * subscription methods.
 * $onDestroy implementtation might be the following
 * this.offFunctions.forEach((off: Function) => {
 *    off();
 * });
 */
export interface IEventSubscriber {
  offFunctions: Array<Function>;
  $onDestroy(): void;
}
