angular.module('app').factory('helperService', [
  // --------API-----------
  function() {
    const logFlag = true;

    return {
      log,
    };

    function log(...args) {
      if (logFlag) {
        // eslint-disable-next-line
        console.log(...args);
      }
    }
  },
]);
