// eslint-disable-next-line
(function() {
  const moduleName = 'singleVideo';
  // eslint-disable-next-line
  const templateUrl = `/app/pages/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------
  const bindings = { watchVideo: '=', user: '=' };
  function controller() {
    console.log(`${moduleName} started`);
    this.inputByUser = '';
    this.currentVideo = {};

    const createVideo = () => ({
      href: 'single-video-tabs.html',
      image: 'images/sv-4.png',
      duration: '15:19',
      title: 'Cornfield Chase Outlast II Official Gameplay',
      viewCount: '2,729,347',
      percent: 55,
    });

    this.recommendedVideos = [];
    let i = 10;
    while (i--) this.recommendedVideos.push(createVideo());

    this.channelVideos = [];
    i = 3;
    while (i--) this.channelVideos.push(createVideo());
  }

  // --------------------------------------------------
  // LOAD component
  angular
    .module('app')
    .component(moduleName, { templateUrl, controller, bindings });
  // END module
  // eslint-disable-next-line
})();
