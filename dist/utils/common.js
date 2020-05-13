"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.betterRequire = void 0;

let betterRequire = absPath => {
  let module = require(absPath);

  if (module.default) {
    return module.default;
  }

  return module;
};

exports.betterRequire = betterRequire;