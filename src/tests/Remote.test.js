
/**
 * Copyright Composiv Inc and its affiliates
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

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
