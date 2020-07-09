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
