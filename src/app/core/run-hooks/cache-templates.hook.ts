export function cacheTemplatesHook($templateCache: ng.ITemplateCacheService) {
  'ngInject';
  // TODO: Turn templates ids into enum?
  $templateCache.put(
    'error-messages-generic',
    require('../templates/common-error-messages.html')
  );

  $templateCache.put(
    'delete-dialog',
    require('../dialogs/delete-dialog.template.html')
  );
}
