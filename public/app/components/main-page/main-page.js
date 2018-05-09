// eslint-disable-next-line
(function(app) {
  // START MODULE
  const moduleName = 'mainPage';
  const templateUrl = '/app/components/main-page/main-page.template.html';

  function controller() {
    this.value = 0;
  }

  // --------------------------------------------------
  // LOAD component
  app.component(moduleName, { templateUrl, controller });
  // END module
  // eslint-disable-next-line
})(app);
