import { User } from '../entities/user';
import { IAppConfig } from '../interfaces/app-config';
import { ApiError } from '../errors/api-error';

export class AuthService {
  static selector = 'authService';
  static events = {
    logIn: 'auth.logIn',
    logOut: 'auth.logOut'
  };

  private storage = {
    get<T>(key: string): T | null {
      const rawValue = localStorage.getItem(key);
      return rawValue ? (JSON.parse(rawValue) as T) : null;
    },
    set(key: string, value: any) {
      return localStorage.setItem(key, JSON.stringify(value));
    },
    remove(key: string) {
      localStorage.removeItem(key);
    }
  };

  private userStorageKey = 'user';
  private apiUrl: string;

  constructor(
    private $http: ng.IHttpService,
    appConfig: IAppConfig,
    private $rootScope: ng.IRootScopeService
  ) {
    'ngInject';
    this.apiUrl = `${appConfig.apiUrl}/users`;
  }

  logIn(login: string, password: string) {
    return this.$http
      .get<User[]>(this.apiUrl, {
        params: {
          id: login,
          password
        }
      })
      .then(({ data: users }: ng.IHttpResponse<User[]>) => {
        if (users.length === 0) {
          throw new ApiError('Wrong login or password', {
            wrongLoginPassword: true
          });
        }

        this.setUser(users[0]);

        return users[0];
      });
  }

  logOut() {
    // Simulate async request
    return new Promise((resolve: any) => {
      this.setUser(null);
      resolve();
    });
  }

  isAuthenticated() {
    return !!this.getUser();
  }

  getLoggedUser() {
    return this.getUser();
  }

  private getUser() {
    return this.storage.get<User>(this.userStorageKey);
  }

  private setUser(user: User) {
    if (user) {
      this.storage.set(this.userStorageKey, user);
      this.$rootScope.$broadcast(AuthService.events.logIn, user);
    } else {
      this.storage.remove(this.userStorageKey);
      this.$rootScope.$broadcast(AuthService.events.logOut);
    }
  }
}
