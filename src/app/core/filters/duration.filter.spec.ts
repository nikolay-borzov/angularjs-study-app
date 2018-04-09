import * as angular from 'angular';
import 'angular-mocks';

import filter from './duration.filter';

describe('duration filter', () => {
  let durationFilter: Function;

  beforeEach(() => {
    angular.module('app', []).filter(filter.selector, filter.factory);

    angular.mock.module('app');
  });

  beforeEach(() =>
    inject(($filter: ng.IFilterService) => {
      durationFilter = $filter(filter.selector);
    })
  );

  it('retuns duration in minutes', () => {
    expect(durationFilter(1)).toBe('1 minute');
  });

  it('returns duration in minutes adding plural ending', () => {
    expect(durationFilter(13)).toBe('13 minutes');
  });

  it('retuns duration in hours', () => {
    expect(durationFilter(60)).toBe('1 hour');
  });

  it('returns duration in hours adding plural ending', () => {
    expect(durationFilter(3 * 60)).toBe('3 hours');
  });

  it('returns duration in minutes and hours', () => {
    expect(durationFilter(61)).toBe('1 hour 1 minute');
  });

  it('returns duration in minutes and hours', () => {
    expect(durationFilter(61)).toBe('1 hour 1 minute');
  });
});
