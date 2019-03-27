import * as Registry from './Registry';

export function cleanFragment(fragment) {
  return fragment.replace(new RegExp("'use strict';", 'g'), "//'use strict';");
}

export function build(fragment, onError) {
  try {
    if (!fragment || fragment.trim().length <= 0) {
      return onError('Empty template', -1, fragment);
    }

    // if (!fragment || fragment.indexOf('//console.log("no view named:') >= 0 || fragment.indexOf('SyntaxError') >= 0) {
    if (!fragment || fragment.indexOf('//console.log("no view named:') >= 0) {
      return onError('Syntax error in template', -2, fragment);
    }

    let component = null;
    if (fragment) {
      const functionBody = cleanFragment(fragment);
      // eslint-disable-next-line no-new-func
      component = new Function('module', 'exports', 'require', '_xprops', 'console', functionBody);
    }

    const exports = {};
    const module = {};
    try {
      component(module, exports, Registry.require, {}, console);
      const Component = module.exports.default || exports.default || module.exports;
      return Component;
    } catch (error) {
      return onError('Error rendering remote component', -3, error);
    }
    /* const Comp = props => {
      try {

        const Component = module.exports.default || exports.default;
        return Registry.renderer()(Component, props);
      } catch (error) {
        return onError('Error rendering remote component', -3, error);
      }
    };
    return Component;
    */
  } catch (error) {
    return onError('View build error', -100, error);
  }
}
