// eslint-disable-next-line
(function() {
  const moduleName = 'tag404';
  // eslint-disable-next-line
  const templateUrl = `/app/components-stateless/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------
  const bindings = {};
  function controller() {
    console.log(`${moduleName} started`);

    // this.$onInit = () => {
    //   if (!this.wrapperClass) this.wrapperClass = 'col-lg-12';
    // };
  }

  // --------------------------------------------------
  // LOAD component
  angular.module('app').component(moduleName, {
    templateUrl,
    controller,
    bindings,
  });
  // END module
  // eslint-disable-next-line
})();
