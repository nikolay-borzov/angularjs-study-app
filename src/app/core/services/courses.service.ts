import { Course } from '../entities/course';
import { IAppConfig } from '../interfaces/app-config';

import { extractData } from './service-helpers';

export class CoursesService {
  static selector = 'coursesService';

  private apiUrl: string;

  private filterLastValue: string;

  constructor(private $http: ng.IHttpService, appConfig: IAppConfig) {
    'ngInject';
    this.apiUrl = `${appConfig.apiUrl}/courses`;
  }

  getCourses(filterTerm: string = ''): ng.IPromise<Course[]> {
    this.filterLastValue = filterTerm;

    return this.$http
      .get<Course[]>(this.apiUrl, {
        params: {
          name_like: filterTerm
        }
      })
      .then(extractData);
  }

  getCourse(id: number) {
    return this.$http
      .get<Course>(this.getCourseApiUrl(id))
      .then(extractData)
      .catch((error: any) => {
        // TODO: handle not existing course - maybe httpProvider interceptor
        console.log(error);
      });
  }

  updateCourse(course: Course) {
    return this.$http.put<Course>(this.getCourseApiUrl(course.id), course);
  }

  private getCourseApiUrl(id: number) {
    return `${this.apiUrl}/${id}`;
  }
}
