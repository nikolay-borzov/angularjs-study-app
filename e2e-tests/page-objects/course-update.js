class CourseUpdatePage {
  get(id = 1) {
    browser.get(`/#/courses/${id}`);
  }

  getPageElement() {
    return element(by.id('course-update-page'));
  }
}

module.exports = new CourseUpdatePage();
