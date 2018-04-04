import * as angular from 'angular';

class DeleteDialogController {
  constructor(
    private $mdDialog: ng.material.IDialogService,
    public entityName: string
  ) {
    'ngInject';
  }

  cancel() {
    this.$mdDialog.cancel();
  }

  confirm() {
    this.$mdDialog.hide();
  }
}

export function getDeleteDialogOptions(event: MouseEvent, entityName: string) {
  return {
    locals: { entityName },
    template: require('./delete-dialog.template.html'),
    parent: angular.element(document.body),
    targetEvent: event,
    controller: DeleteDialogController,
    controllerAs: '$ctrl'
  } as ng.material.IDialogOptions;
}

export function showDeleteDialog(
  $mdDialog: ng.material.IDialogService,
  event: MouseEvent,
  entityName: string
) {
  return $mdDialog.show({
    locals: { entityName },
    template: require('./delete-dialog.template.html'),
    parent: angular.element(document.body),
    targetEvent: event,
    controller: DeleteDialogController,
    controllerAs: '$ctrl'
  });
}
