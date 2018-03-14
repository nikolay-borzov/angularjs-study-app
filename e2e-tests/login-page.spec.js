'use strict';

// Angular E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

const loginPage = require('./page-objects/login');

describe('Login page', () => {
  beforeEach(loginPage.get);

  it('should render Login page', () => {
    const container = loginPage.getPageElement();

    expect(container.isPresent()).toBe(true);
  });

  it('should render Login form', () => {
    const form = loginPage.getFormElement();

    expect(form.isPresent()).toBe(true);
  });
});
