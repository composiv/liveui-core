import { renderer, register, modules, require, getComponentUrl } from '../Registry';

describe('remote', () => {
  test('register throw', () => {
    const register = jest.fn();
    expect(register).toHaveBeenCalledTimes(0);
  });

  it('modules', () => {
    const testExternals = {};
    expect(modules()).toEqual(testExternals);
  });

  it('renderer throw', () => {
    expect(renderer()).toThrow();
  });

  it('require throw', () => {
    const module = 'test2';
    const externals = { test: 'test' };

    function requireError() {
      require(module);
    }
    try {
      register(externals, requireError);
      expect(require(module)).toEqual(externals[module]);
    } catch (e) {
      expect(requireError).toThrowError(Error);
    }
  });

  it('components', () => {
    const module = 'test';
    const externals = { test: 'test' };

    function requireError() {
      require(module);
    }
    register('module_name', externals, requireError);
    expect(getComponentUrl(module)).toEqual(externals[module]);
  });
  it('require externals[module] ', () => {
    const module = 'test';
    const externals = { test: 'test' };

    function requireError() {
      require(module);
    }
    try {
      register(externals, requireError);
      expect(require(module, requireError)).toBe(externals[module]);
    } catch (e) {
      expect(requireError).toThrowError(Error);
    }
  });

  it('register throw2', () => {
    const { shouldntBeExportedFn } = register;
    expect(register()).toEqual(shouldntBeExportedFn);
  });
});
