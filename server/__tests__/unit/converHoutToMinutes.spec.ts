import convertHourToMinutes from '../../src/utils/convertHourToMinutes';

describe('ConvertHourToMinutes Test', () => {
  it('should convert hour to minutes', () => {
    const result = convertHourToMinutes('8:30');

    expect(result).toBe(510);
  });

  it('should throw an error when format is wrong', () => {
    expect(() => convertHourToMinutes('8/30')).toThrow(Error);
  });
});
