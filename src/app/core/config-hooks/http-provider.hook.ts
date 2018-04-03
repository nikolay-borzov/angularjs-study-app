import { dateInterceptor } from '../interceptors/date.interceptor';
import { errorInterceptor } from '../interceptors/error.interceptor';

export function httpProviderHook($httpProvider: ng.IHttpProvider) {
  'ngInject';

  $httpProvider.interceptors.push(errorInterceptor);
  $httpProvider.interceptors.push(dateInterceptor);
}
