// eslint-disable-next-line
(function(app) {
  // START MODULE
  const moduleName = 'mainPage';
  // eslint-disable-next-line
  const templateUrl = templateUrlGenerate(moduleName);

  function controller() {
    this.value = 0;
  }

  // --------------------------------------------------
  // LOAD component
  app.component(moduleName, { templateUrl, controller });
  // END module
  // eslint-disable-next-line
})(app);
