import * as angular from 'angular';
import 'angular-mocks';

import { LoginForm } from './login-form.component';

describe('LoginForm component', () => {
  let ctrl: any;

  beforeEach(() => {
    // TODO: Move to testUtils.ts?
    angular.module('app', []).component(LoginForm.selector, LoginForm);
    angular.mock.module('app');
  });

  beforeEach(() =>
    angular.mock.inject(($componentController: any) => {
      ctrl = $componentController(LoginForm.selector);
    })
  );

  it('should exist', () => {
    expect(ctrl).toBeDefined();
  });
});
