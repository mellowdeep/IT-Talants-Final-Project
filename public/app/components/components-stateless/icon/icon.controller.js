// eslint-disable-next-line
(function(app) {
  const moduleName = 'icon';
  // eslint-disable-next-line
  const templateUrl = templateUrlGenerateStateless(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------

  function controller($attrs) {
    this.hover = false;
    this.text = $attrs.fa;
  }

  // --------------------------------------------------
  // LOAD component
  app.component(moduleName, { templateUrl, controller });
  // END module
  // eslint-disable-next-line
})(app);
