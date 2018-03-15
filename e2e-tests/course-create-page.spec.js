'use strict';

const courseCreatePage = require('./page-objects/course-create');

describe('Course Create page', () => {
  beforeEach(courseCreatePage.get);

  it('should render Course Create page', () => {
    const container = courseCreatePage.getPageElement();

    expect(container.isPresent()).toBe(true);
  });
});
