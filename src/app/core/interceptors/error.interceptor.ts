import { StateService } from '@uirouter/core';

import { States } from '../enums/route-states';

export function errorInterceptor(
  $injector: ng.auto.IInjectorService,
  $q: ng.IQService
): ng.IHttpInterceptor {
  'ngInject';

  return {
    responseError<T>(response: ng.IHttpResponse<T>) {
      if (response.status === 404) {
        const $state = $injector.get('$state') as StateService;

        $state.transition.abort();

        $state.go(States.NotFound, undefined, { location: false });

        return $q.resolve(null);
      }

      return response;
    }
  };
}
