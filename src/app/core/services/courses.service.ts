import { Course } from '../entities/course';
import { IAppConfig } from '../interfaces/app-config';

export class CoursesService {
  static selector = 'coursesService';

  private apiUrl: string;
  private apiDelay: 5000;

  private filterLastValue: string;

  constructor(private $http: ng.IHttpService, appConfig: IAppConfig) {
    this.apiUrl = `${appConfig.apiUrl}/courses`;
  }

  getCourses(filterTerm: string = '') {
    this.filterLastValue = filterTerm;

    return this.$http
      .get<Course[]>(this.apiUrl, {
        params: {
          name_like: filterTerm
        }
      })
      .then(({ data: courses }: ng.IHttpResponse<Course[]>) => courses);
  }
}
