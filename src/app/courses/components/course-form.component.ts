import { StateService } from '@uirouter/core';

import { Course } from '../../core/entities/course';
import { Author } from '../../core/entities/author';

class CourseFormController {
  course: Course;
  authors: Author[];

  model: Course;

  // Events
  onSubmit: ($event: { model: Course }) => void;
  onCancel: () => void;

  constructor(private $state: StateService) {
    'ngInject';
  }

  $onInit() {
    this.model = this.course || new Course();
  }

  submit() {
    this.onSubmit({ model: this.model });
  }

  cancel() {
    this.onCancel();
  }
}

export class CourseForm implements ng.IComponentOptions {
  static selector = 'courseForm';
  static controller = CourseFormController;
  static template = require('./course-form.template.html');
  static bindings = {
    course: '<',
    authors: '<',
    onSubmit: '&',
    onCancel: '&'
  };
}
