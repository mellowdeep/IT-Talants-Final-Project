// eslint-disable-next-line
(function(app) {
  // START MODULE
  const moduleName = 'testInfo0';
  const templateUrl = '/app/components/test/test0.template.html';

  function controller($scope) {
    this.value = 0;
  }

  // --------------------------------------------------
  // LOAD component
  app.component(moduleName, { templateUrl, controller });
  // END module
  // eslint-disable-next-line
})(app);
