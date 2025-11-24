require('@testing-library/jest-dom');
global.IS_REACT_ACT_ENVIRONMENT = true;

const React = require('react');
const ReactDOM = require('react-dom');

// React.act가 없는 경우 polyfill 추가 (React 19 호환성)
if (!React.act) {
  React.act = function act(callback) {
    let result;
    // flushSync로 동기적으로 업데이트 실행
    ReactDOM.flushSync(() => {
      result = callback();
    });
    // Promise를 반환하는 경우 처리
    if (result && typeof result.then === 'function') {
      return result.then(() => undefined);
    }
    return Promise.resolve();
  };
}
