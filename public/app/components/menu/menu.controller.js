// eslint-disable-next-line
(function(app) {
  const moduleName = 'menu';
  // eslint-disable-next-line
  const templateUrl = templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------

  function controller() {
    this.favorite = [{ name: 'My favorite video', link: '#/' }];
    this.myVideos = [{ name: 'My video', link: '#/' }];
    this.channels = [
      { name: 'chinnels i subscribe', link: '#/' },
      { name: 'chinnels i subscribe', link: '#/' },
    ];
  }

  // --------------------------------------------------
  // LOAD component
  app.component(moduleName, { templateUrl, controller });
  // END module
  // eslint-disable-next-line
})(app);
