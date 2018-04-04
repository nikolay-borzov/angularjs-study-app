import { getDeleteDialogOptions } from '../dialogs/delete-dialog';

export function dialogsHook($mdDialogProvider: ng.material.IDialogProvider) {
  'ngInject';

  $mdDialogProvider.addPreset('delete', {
    options: getDeleteDialogOptions
  });
}
