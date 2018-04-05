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

export const deleteDialogPreset = {
  methods: ['targetEvent', 'entityName'],
  options: () => {
    return {
      template: require('./delete-dialog.template.html'),
      parent: angular.element(document.body),
      controller: DeleteDialogController,
      controllerAs: '$ctrl'
    };
  }
};
