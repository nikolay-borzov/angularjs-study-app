import { ILoginModel } from './login-model';

class LoginFormController {
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

  errorText: string;

  onSubmit: ($event: { model: ILoginModel }) => void;

  $onChanges() {
    if (this.errorText) {
      this.model.password = '';
    }
  }

  submit() {
    this.onSubmit({ model: this.model });
  }
}

export class LoginForm implements ng.IComponentOptions {
  static selector = 'loginForm';
  static controller = LoginFormController;
  static template = require('./login-form.template.html');
  static bindings = {
    onSubmit: '&',
    errorText: '<'
  };
}
