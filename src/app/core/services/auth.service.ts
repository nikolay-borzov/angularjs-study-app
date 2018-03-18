import { User } from '../entities/user';
import { IAppConfig } from '../interfaces/app-config';
import { ApiError } from '../errors/api-error';

export class AuthService {
  static selector = 'authService';

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

  constructor(private $http: ng.IHttpService, appConfig: IAppConfig) {
    'ngInject';
    // TODO: Remove ngResourse
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
    return this.setUser(null);
  }

  private getUser() {
    return this.storage.get<User>(this.userStorageKey);
  }

  private setUser(user: User) {
    if (user) {
      this.storage.set(this.userStorageKey, user);
    } else {
      this.storage.remove(this.userStorageKey);
    }
  }
}
