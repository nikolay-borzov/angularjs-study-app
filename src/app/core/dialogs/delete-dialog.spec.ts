import * as angular from 'angular';
import 'angular-mocks';

import { deleteDialogPreset } from './delete-dialog';

describe('delete-dialog', () => {
  let ctrl: any;
  let deleteDialogController = deleteDialogPreset.options().controller;

  let $mdDialogSpy = jasmine.createSpyObj('$mdDialog', ['cancel', 'hide']);

  beforeEach(() => {
    angular.mock.module('app.core');
  });

  beforeEach(() => {
    ctrl = new deleteDialogController($mdDialogSpy, 'Some entity');
  });

  it('calls `cancel` on cancel action', () => {
    ctrl.cancel();

    expect($mdDialogSpy.cancel).toHaveBeenCalled();
  });

  it('calls `hide` on confirm', () => {
    ctrl.confirm();

    expect($mdDialogSpy.hide).toHaveBeenCalled();
  });

  it('has `entityName` property', () => {
    expect(ctrl.entityName).toBe('Some entity');
  });
});
