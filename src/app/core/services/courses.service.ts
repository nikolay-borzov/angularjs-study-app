import { Course } from '../entities/course';
import { IAppConfig } from '../interfaces/app-config';

import { extractData } from './service-helpers';

export class CoursesService {
  static selector = 'coursesService';

  private apiUrl: string;

  private filterLastValue: string;

  constructor(private $http: ng.IHttpService, appConfig: IAppConfig) {
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

  getCourse(id: number): ng.IPromise<Course> {
    const url = `${this.apiUrl}/${id}`;
    // TODO: handle not existing course
    return this.$http.get<Course>(url).then(extractData);
  }
}
