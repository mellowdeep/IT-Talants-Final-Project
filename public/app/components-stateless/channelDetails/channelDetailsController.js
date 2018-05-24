// eslint-disable-next-line
(function() {
  const moduleName = 'channelDetails';
  // eslint-disable-next-line
  const templateUrl = `/app/components-stateless/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------
  const bindings = { aboutAuthor: '<' };
  const require = ['^about-author'];
  function controller() {
    console.log(`${moduleName} started`);

    console.log('chd', this.aboutAuthor);

    // this.$onInit = () => {
    //   if (!this.wrapperClass) this.wrapperClass = 'col-lg-12';
    // };
  }

  // --------------------------------------------------
  // LOAD component
  angular.module('app').component(moduleName, {
    templateUrl,
    controller,
    transclude: true,
    bindings,
    require,
  });
  // END module
  // eslint-disable-next-line
})();
