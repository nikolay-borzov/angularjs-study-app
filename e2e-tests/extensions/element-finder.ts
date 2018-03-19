import { ElementFinder } from 'protractor';

ElementFinder.prototype.getClasses = function() {
  return this.getAttribute('class').then((classString: string) =>
    classString.split(' ')
  );
};
