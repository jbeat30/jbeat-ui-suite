require('@testing-library/jest-dom');

global.IS_REACT_ACT_ENVIRONMENT = true;

const React = require('react');
const ReactDOM = require('react-dom');

if (!React.act) {
  React.act = function act(callback) {
    let result;
    ReactDOM.flushSync(() => {
      result = callback();
    });
    if (result && typeof result.then === 'function') {
      return result.then(() => undefined);
    }
    return Promise.resolve();
  };
}
