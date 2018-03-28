import { Author } from '../entities/author';
import { IAppConfig } from '../interfaces/app-config';

import { extractData } from './service-helpers';

export class AuthorsService {
  static selector = 'authorsService';

  private apiUrl: string;

  constructor(private $http: ng.IHttpService, appConfig: IAppConfig) {
    'ngInject';
    this.apiUrl = `${appConfig.apiUrl}/authors`;
  }

  getAuthors(): ng.IPromise<Author[]> {
    return this.$http.get<Author[]>(this.apiUrl).then(extractData);
  }
}
