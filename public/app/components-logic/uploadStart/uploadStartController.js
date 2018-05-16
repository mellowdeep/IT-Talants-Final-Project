// eslint-disable-next-line
(function() {
  const moduleName = 'uploadStart';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------

  const bindings = { user: '<', uploadFile: '=' };
  const injection = [];
  function controller() {
    // this.$postLink = () => {
    //   // input = $element.find('input')[0];
    //   console.log(this.uploadFile);
    // };
    // this.uploadInput = () => {
    //   console.log('uploadinput');
    // };
    // this.upload = () => {
    // };
  }

  // --------------------------------------------------
  // LOAD component
  angular.module('app').component(moduleName, {
    templateUrl,
    controller: [...injection, controller],
    bindings,
  });
  // END module
  // eslint-disable-next-line
})();
