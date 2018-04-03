export default {
  selector: 'duration',
  factory: function() {
    function getPluralEnding(count: number) {
      return count >= 2 ? 's' : '';
    }

    return function(minutes: number) {
      const h = Math.trunc(minutes / 60);
      const m = minutes % 60;

      const result = [];

      if (h) {
        result.push(`${h} hour${getPluralEnding(h)}`);
      }

      if (m) {
        result.push(`${m} minute${getPluralEnding(m)}`);
      }

      return result.join(' ');
    };
  }
};
