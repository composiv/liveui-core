/* eslint-disable no-underscore-dangle */
let externals = {};
let components = {};

let _renderer = function defaultRenderer() {
  throw new Error('There is no renderer.  Please register a renderer for Open canvas using Registry.register...');
};

export function register(packages, externalComponents, externalRenderer) {
  externals = packages;
  components = externalComponents;
  _renderer = externalRenderer;
}

export function modules() {
  return externals;
}

export function getComponentUrl(name) {
  return components[name];
}

export function renderer() {
  return _renderer;
}

export function require(module) {
  if (!(module in externals)) throw new Error(`Module not found: ${module}`);
  return externals[module];
}
