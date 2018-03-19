import { browser, element, by } from 'protractor';
import './extensions/element-finder';

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

    it('should enable submit button if all fields are filled', () => {
      po.setLogin('login');
      po.setPassword('Pa77W0rd');

      expect(po.submitButton.isEnabled()).toBeTruthy();
    });

    it('should clear password field if login or password is invalid', () => {
      po.setLogin('wronglogin');
      po.setPassword('wrongPassword');

      po.submitForm();

      expect(po.passwordField.getAttribute('value')).toBe('');
    });

    it('should show error message if login or password is invalid', () => {
      po.setLogin('wronglogin');
      po.setPassword('wrongPassword');

      po.submitForm();

      expect(po.errorMessage.isPresent()).toBeTruthy();
    });

    fit('should redirect to courses page after successfull login', () => {
      po.setLogin('q');
      po.setPassword('q');

      po.submitForm();

      return browser.driver.wait(() => {
        return browser.driver.getCurrentUrl().then((url: string) => {
          return url.endsWith('/courses');
        });
      }, 10000);
      /*
      browser.wait(() => {
        expect(browser.driver.getCurrentUrl()).toMatch('/#/courses');
      }, 2000);*/
    });

    describe('validation', () => {
      it('should require login', () => {
        expect(po.loginField.getAttribute('required')).toBeTruthy();
      });

      it('should allow latin characters for login', () => {
        po.setLogin('lOgIn').then(() => {
          expect(po.loginField.getClasses()).toContain('ng-valid');
        });
      });

      it('should not allow number for login', () => {
        po.setLogin('1ogin').then(() => {
          expect(po.loginField.getClasses()).toContain('ng-invalid');
        });
      });

      it('should not allow non-latin characters for login', () => {
        po.setLogin('Логин').then(() => {
          expect(po.loginField.getClasses()).toContain('ng-invalid');
        });
      });

      it('should require password', () => {
        expect(po.passwordField.getAttribute('required')).toBeTruthy();
      });

      it('should allow latin characters for password', () => {
        po.setPassword('PassWord').then(() => {
          expect(po.passwordField.getClasses()).toContain('ng-valid');
        });
      });

      it('should allow numbers for password', () => {
        po.setPassword('Pa77W0rd').then(() => {
          expect(po.passwordField.getClasses()).toContain('ng-valid');
        });
      });

      it('should not allow non-latin characters password', () => {
        po.setPassword('ПаРоль').then(() => {
          expect(po.passwordField.getClasses()).toContain('ng-invalid');
        });
      });
    });
  });
});
