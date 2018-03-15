'use strict';

const coursesPage = require('./page-objects/courses');

describe('Courses page', () => {
  beforeEach(coursesPage.get);

  it('should render Courses page', () => {
    const container = coursesPage.getPageElement();

    expect(container.isPresent()).toBe(true);
  });
});
