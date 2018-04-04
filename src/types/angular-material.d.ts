import * as angular from 'angular';

declare module 'angular' {
  namespace material {
    interface IDialogPresetDefinition {
      options(...args: any[]): IDialogOptions;
    }

    interface IDialogProvider {
      addPreset(name: string, definition: IDialogPresetDefinition);
    }

    interface IDialogService {
      [name: string]: any;
    }
  }
}
