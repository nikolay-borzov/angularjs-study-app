class CourseCreatePage {
  get() {
    browser.get('/#/courses/new');
  }

  getPageElement() {
    return element(by.id('course-create-page'));
  }
}

module.exports = new CourseCreatePage();
