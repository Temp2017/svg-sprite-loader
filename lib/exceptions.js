const { PACKAGE_NAME } = require('./config');

class LoaderException extends Error {
  constructor(message) {
    super(`${PACKAGE_NAME} exception. ${message}`);

    this.name = this.constructor.name;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}

class ExtractPluginMissingException extends LoaderException {
  constructor() {
    super(`${PACKAGE_NAME} in extract mode requires the corresponding plugin`);
  }
}

class InvalidRuntimeException extends LoaderException {
  constructor(runtime) {
    super(`Runtime generator "${runtime}" not found`);
  }
}

class SeveralRulesAppliedException extends LoaderException {
  constructor(resource, rules) {
    super(`${rules.length} rules applies to ${resource}`);
  }
}

class RemainingLoadersInExtractModeException extends LoaderException {
  constructor() {
    super(`Some loaders will be applied after ${PACKAGE_NAME} in extract mode`);
  }
}

exports.LoaderException = LoaderException;
exports.ExtractPluginMissingException = ExtractPluginMissingException;
exports.InvalidRuntimeException = InvalidRuntimeException;
exports.SeveralRulesAppliedException = SeveralRulesAppliedException;
exports.RemainingLoadersInExtractModeException = RemainingLoadersInExtractModeException;
