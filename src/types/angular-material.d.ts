import * as angular from 'angular';

declare module 'angular' {
  namespace material {
    // Add missing types. Remove after https://github.com/DefinitelyTyped/DefinitelyTyped/pull/24733

    interface IDialogProvider {
      addPreset(
        name: string,
        presetOptions: {
          methods: string[];
          options: () => IDialogOptions;
        }
      );
    }

    interface IDialogService {
      [name: string]: any;
    }

    // Delete dialog

    interface IDeleteDialog extends IPresetDialog<IDeleteDialog> {
      entityName(entityName: string): IDeleteDialog;
    }

    interface IDialogService {
      delete(): IDeleteDialog;
    }
  }
}
