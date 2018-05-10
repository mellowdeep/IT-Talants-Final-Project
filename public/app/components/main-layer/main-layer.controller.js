// eslint-disable-next-line
(function(app) {
  const moduleName = 'mainLayer';
  // eslint-disable-next-line
  const templateUrl = templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------

  function controller() {}

  // --------------------------------------------------
  // LOAD component
  app.component(moduleName, { templateUrl, controller });
  // END module
  // eslint-disable-next-line
})(app);
