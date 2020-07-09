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

import { cleanFragment, build } from '../ViewBuilder';
import * as Remote from '../Registry';

describe('viewbuilder', () => {
  const componentName = 'Module';
  const fragment = { empty: '', name: "'use strict';", index: '//console.log("no view named:' };
  const onError = function error() {
    return Function;
  };

  it('fragment should clean', () => {
    expect(cleanFragment(fragment.name)).toBe("//'use strict';");
  });

  it('build trim case 1 ', () => {
    expect(build(fragment.empty, onError));
    try {
      if (!fragment.empty || fragment.empty.trim().length <= 0) {
        expect(build(fragment.empty, onError)).toEqual(onError('Empty template', -1, fragment));
      }
    } catch (error) {
      expect(build(fragment.empty, onError)).toEqual(onError('View build error', -100, error));
    }
  });

  it('build trim case 2 ', () => {
    expect(build(fragment.name, onError));
    try {
      if (!fragment.name || fragment.name.trim().length <= 0) {
        expect(build(fragment.name, onError)).toEqual(onError('Empty template', -1, fragment));
      }
    } catch (error) {
      expect(build(fragment.name, onError)).toEqual(onError('View build error', -100, error));
    }
  });

  it('build indexOf case 1 ', () => {
    expect(build(fragment.index, onError));
    try {
      if (!fragment.index || fragment.index.indexOf(fragment.index) >= 0) {
        expect(build(fragment.index, onError)).toEqual(onError('Syntax error in template', -2, fragment));
      }
    } catch (error) {
      expect(build(fragment.index, onError)).toEqual(onError('View build error', -100, error));
    }
  });

  it('build indexOf case 2', () => {
    expect(build(fragment.empty, onError));
    try {
      if (!fragment.empty || fragment.empty.indexOf('//console.log("no view named:') >= 0) {
        expect(build(fragment.empty, onError)).toEqual(onError('Syntax error in template', -2, fragment));
      }
    } catch (error) {
      expect(build(fragment.empty, onError)).toEqual(onError('View build error', -100, error));
    }
  });

  it('build tryCatch case 1', () => {
    try {
      expect(build(fragment.empty, 'onError'));
    } catch (error) {
      expect(build(fragment.name, onError)).toEqual(onError('View build error', -100, error));
    }
  });

  it('build fragment case 1', () => {
    expect(build(fragment.name, onError));
    let component = null;

    try {
      if (fragment.name) {
        const functionBody = cleanFragment(fragment.name);
        component = jest
          .fn(() => 'default')
          .mockImplementationOnce(() => 'module')
          .mockImplementationOnce(() => 'exports')
          .mockImplementationOnce(() => 'require')
          .mockImplementationOnce(() => 'xprops')
          .mockImplementationOnce(() => 'console')
          .mockImplementationOnce(() => functionBody);
      }

      const exports = {};
      const module = {};
      try {
        component(module, exports, Remote.require, {}, console);

        const Component = module.exports[componentName] || module.exports.default || exports.default;
        expect(build(fragment.name, onError)).toBe(Component);
      } catch (error) {
        expect(build(fragment.name, onError)).toEqual(onError('Error rendering remote component', -3, error));
      }
    } catch (error) {
      expect(build(fragment.name, onError)).toEqual(onError('View build error', -100, error));
    }
  });
});
