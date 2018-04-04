interface ISelectionRange {
  start: number;
  end: number;
  direction: 'forward' | 'backward' | 'none';
}

const regEx = /^(\d{2}).(\d{2}).(\d{4})$/;
const replaceValue = '$3-$2-$1';

const patternString = 'dd.dd.dddd';
const charTypes = {
  d: /\d/
};

/**
 * Converts pattern string to character pattern array
 * @param patternString - Pattern string
 * @param charTypes - Character to pattern map
 */
function parsePattern(
  patternString: string,
  charTypes: any
): Array<RegExp | string> {
  return patternString.split('').map((char: string) => {
    return charTypes.hasOwnProperty(char) ? charTypes[char] : char;
  });
}

/**
 * Validates whether
 * @param value - String to validate
 * @param pattern - Character pattern array
 */
function validateByPattern(value: string, pattern: Array<RegExp | string>) {
  if (value.length > pattern.length) {
    return false;
  }

  return value
    .split('')
    .every((char: string, index: number) => validateChar(char, pattern[index]));
}

/**
 * Validate individual character against pattern
 * @param char - Character to validate
 * @param patternToken - Character pattern
 */
function validateChar(char: string, patternToken: RegExp | string) {
  if (patternToken instanceof RegExp) {
    return (patternToken as RegExp).test(char);
  }

  return char === patternToken;
}

export function dateInput(
  $document: ng.IDocumentService,
  $timeout: ng.ITimeoutService
): ng.IDirective {
  'ngInject';

  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {},
    link: function(
      scope: ng.IScope,
      element: ng.IAugmentedJQuery,
      attrs: ng.IAttributes,
      ngModelCtrl: ng.INgModelController
    ) {
      const pattern = parsePattern(patternString, charTypes);

      let previousViewValue = '';
      let previousModelValue: null | Date;

      let input = element[0] as HTMLInputElement;
      let selection = {
        start: 0,
        end: 0,
        direction: 'none'
      } as ISelectionRange;

      // Remember last selection
      let onSelectionChange = function(e: JQueryEventObject) {
        // Only watch for current input selection changes
        if ($document[0].activeElement === input) {
          selection.start = input.selectionStart;
          selection.end = input.selectionEnd;
          selection.direction = input.selectionDirection as
            | 'forward'
            | 'backward'
            | 'none';
        }
      };

      // Parse date string to Date object
      let parse = function(value: string) {
        // Revert the change if value doesn't match the pattern
        if (!validateByPattern(value, pattern)) {
          ngModelCtrl.$setViewValue(previousViewValue);
          ngModelCtrl.$render();

          // Restore selection
          let input = element[0] as HTMLInputElement;
          input.setSelectionRange(
            selection.start,
            selection.end,
            selection.direction
          );

          // Return latest model value
          return previousModelValue;
        }

        previousViewValue = value;

        // Convert to date if match is exact: 'dd.MM.yyyy' -> new Date('yyy-MM-dd')
        previousModelValue =
          value && regEx.test(value)
            ? new Date(value.replace(regEx, replaceValue))
            : null;

        return previousModelValue;
      };

      // Format Date object to date string
      let format = function(value: Date) {
        // dd.MM.yyyy
        return value ? value.toLocaleDateString('ru-RU') : '';
      };

      // Validate Date
      let validate = function(modelValue: Date, viewValue: string) {
        return modelValue && !isNaN(modelValue.getTime());
      };

      // Wait until digest end and save initial value
      // https://stackoverflow.com/questions/37808107/how-to-access-modelvalue-and-viewvalue-from-inside-custom-directives
      $timeout(function() {
        previousViewValue = ngModelCtrl.$viewValue;
      }, 0);

      $document.on('selectionchange', onSelectionChange);

      ngModelCtrl.$formatters.push(format);
      ngModelCtrl.$parsers.push(parse);
      ngModelCtrl.$validators.date = validate;

      scope.$on('$destroy', () => {
        $document.off('selectionchange', onSelectionChange);
      });
    }
  };
}
