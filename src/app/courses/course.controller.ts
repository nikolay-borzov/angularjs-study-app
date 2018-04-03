import { StateService } from '@uirouter/core';

import { CoursesService } from '../core/services/courses.service';
import { States } from '../core/enums/route-states';

export abstract class CoursePageController {
  isLoading = false;

  constructor(
    protected coursesService: CoursesService,
    protected $state: StateService
  ) {}

  goBack() {
    this.$state.go(States.Courses);
  }

  protected afterSave = () => {
    // TODO: Pass course id in order to highlight updated course
    this.$state.go(
      States.Courses,
      {},
      {
        // https://github.com/angular-ui/ui-router/issues/3399
        reload: true
      }
    );
  };
}
