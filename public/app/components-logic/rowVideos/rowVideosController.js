// eslint-disable-next-line
(function() {
  const moduleName = 'rowVideos';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------

  const bindings = { user: '<' };
  function controller() {
    console.log(`${moduleName} started`);

    this.videoList = [];

    let i = 8;
    while (i) {
      this.videoList.push({
        image: 'images/video1-1.png',
        href: '#/',
        time: '3:50',
        title: "YoMan's Sky: 21 Minutes of New Gameplay - IGN First",
        views: '27,548',
        likeRate: '78%',
        watched: Math.round(Math.random()),
      });
      i -= 1;
    }
  }

  // --------------------------------------------------
  // LOAD component
  angular
    .module('app')
    .component(moduleName, { templateUrl, controller, bindings });
  // END module
  // eslint-disable-next-line
})();
