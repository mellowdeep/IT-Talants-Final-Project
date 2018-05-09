// eslint-disable-next-line
(function(app) {
  // START MODULE
  const moduleName = 'test';
  const templateUrl = '/app/components/test/test.template.html';

  function controller() {
    this.value = 0;
  }

  // --------------------------------------------------
  // LOAD component
  app.component(moduleName, { templateUrl, controller });
  // END module
  // eslint-disable-next-line
})(app);
