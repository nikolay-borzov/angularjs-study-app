import { ILoginModel } from './login-model';
import { User } from '../core/entities/user';

class LoginFormController {
  errorText: string;
  loggedAs: User;

  model = {
    login: '',
    password: ''
  } as ILoginModel;

  validation = {
    login: {
      pattern: '[a-zA-Z]*'
    },
    password: {
      pattern: '[a-zA-Z\\d]*'
    }
  };

  // Events
  onSubmit: ($event: { model: ILoginModel }) => void;
  onLogOut: () => void;

  $onChanges() {
    if (this.errorText) {
      this.model.password = '';
    }
  }

  submit() {
    this.onSubmit({ model: this.model });
  }

  logOut() {
    this.onLogOut();
  }
}

export class LoginForm implements ng.IComponentOptions {
  static selector = 'loginForm';
  static controller = LoginFormController;
  static template = require('./login-form.template.html');
  static bindings = {
    onSubmit: '&',
    onLogOut: '&',
    errorText: '<',
    loggedAs: '<'
  };
}
