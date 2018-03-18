import { browser, element, by } from 'protractor';

// Angular E2E Testing Guide: https://docs.angularjs.org/guide/e2e-testing

import { po } from './page-objects/login';

describe('Login page', () => {
  beforeEach(po.get);

  it('should render Login page', () => {
    expect(po.page.isPresent()).toBeTruthy();
  });

  describe('Login from', () => {
    it('should render Login form', () => {
      expect(po.form.isPresent()).toBeTruthy();
    });

    it('should disable submit button by default', () => {
      expect(po.submitButton.isEnabled()).toBeFalsy();
    });

    describe('validation', () => {
      xit('should allow only latin characters for login field', () => {
        po.setLogin('7aФу~').then(() => {});
      });
    });
  });
});
