import * as angular from 'angular';
import 'angular-mocks';

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let ctrl: any;

  beforeEach(() => {
    angular.module('app', []).component(LoginPage.selector, LoginPage);

    angular.mock.module('app');
  });

  beforeEach(() =>
    angular.mock.inject(($componentController: any) => {
      ctrl = $componentController(LoginPage.selector);
    })
  );

  it('should exist', () => {
    expect(ctrl).toBeDefined();
  });
});
