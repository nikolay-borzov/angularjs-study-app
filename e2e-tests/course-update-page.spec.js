'use strict';

const coursesUpdatePage = require('./page-objects/course-update');

describe('Course Update page', () => {
  beforeEach(coursesUpdatePage.get);

  it('should render Courses page', () => {
    const container = coursesUpdatePage.getPageElement();

    expect(container.isPresent()).toBe(true);
  });
});
