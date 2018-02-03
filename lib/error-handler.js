'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = errorHandler;

var _errors = require('@feathersjs/errors');

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function errorHandler(error) {
  let feathersError = error;
  if (error.name === 'CouchError') {
    const ErrorType = error.code === 404 || error.headers.status === 404 ? _errors2.default.NotFound : _errors2.default.GeneralError;
    feathersError = new ErrorType(error, {
      ok: error.ok,
      code: error.code
    });
  }

  throw feathersError;
}
module.exports = exports['default'];