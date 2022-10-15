import Formatter from '../formatter';

describe('formatter', () => {
  describe('injectUrlParam', () => {
    it('replace correctly string param sent', () => {
      const templateEx = 'https://github.com/{owner}';
      const owner = 'cklinx';
      expect(Formatter.injectUrlParam(templateEx, owner)).toBe('https://github.com/cklinx');
    });

    it('truncate correctly works', () => {
      const owner = 'cklinx-ithub';
      expect(Formatter.truncate(owner, 6)).toBe('cklinx...');
    });
  });
});
