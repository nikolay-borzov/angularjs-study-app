class CoursesPage {
  get() {
    browser.get('/#/courses');
  }

  getPageElement() {
    return element(by.id('courses-page'));
  }
}

module.exports = new CoursesPage();
