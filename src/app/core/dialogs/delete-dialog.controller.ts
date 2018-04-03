class DeleteDialogController {
  constructor(private $mdDialog: ng.material.IDialogService) {}

  cancel() {
    this.$mdDialog.cancel();
  }

  confrim() {
    this.$mdDialog.confirm();
  }
}

class DeleteDialog {
  constructor(private $mdDialog: ng.material.IDialogService) {}
}
