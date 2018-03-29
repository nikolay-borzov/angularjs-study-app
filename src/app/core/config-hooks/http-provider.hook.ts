import { dateInterceptor } from '../interceptors/date.interceptor';

export function httpProviderHook($httpProvider: ng.IHttpProvider) {
  'ngInject';

  $httpProvider.interceptors.push(dateInterceptor);
}
