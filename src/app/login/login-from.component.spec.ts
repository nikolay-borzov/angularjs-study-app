import * as angular from 'angular';
import 'angular-mocks';

import { LoginForm } from './login-form.component';

describe('LoginForm component', () => {
  let ctrl: any;

  const bindings = {
    onSubmit: jasmine.createSpy('onSubmit'),
    errorText: ''
  };

  beforeEach(() => {
    // TODO: Move to testUtils.ts?
    angular.module('app', []).component(LoginForm.selector, LoginForm);
    angular.mock.module('app');
  });

  beforeEach(() =>
    angular.mock.inject(($componentController: ng.IControllerService) => {
      ctrl = $componentController(LoginForm.selector, {}, bindings);
    })
  );

  it('should exist', () => {
    expect(ctrl).toBeDefined();
  });

  it('it should call `onSubmit` binding on form submit', () => {
    const model = { login: 'user', password: 'pass' };
    ctrl.model = model;

    ctrl.submit();

    expect(bindings.onSubmit).toHaveBeenCalledWith({ model: model });
  });

  it('should clear password field when `errorText` is set', () => {
    const model = { login: 'user', password: 'pass' };
    ctrl.model = model;

    ctrl.errorText = 'Some error';
    ctrl.$onChanges();

    expect(ctrl.model.password).toBe('');
  });
});
