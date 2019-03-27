import * as ViewBuilder from './ViewBuilder';
import * as Registry from './Registry';

let config;

function initializeApp(_config) {
  config = _config;
  Registry.register(config.shares, config.remotes);
}

const liveui = { ViewBuilder, Registry, initializeApp, config };

export { ViewBuilder, Registry, initializeApp, config };

export default liveui;
