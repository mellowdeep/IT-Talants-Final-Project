// eslint-disable-next-line
(function() {
  const moduleName = 'uploadEdit';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------

  const injection = [];
  function controller() {
    this.videoAbout =
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit';
    this.videoTitle = 'Title asdfasdf';
    // form
    this.fileSize = '130 MB';
    this.percentComplete = 10;
    this.isPrivate = 0;
    this.tags = ['music', 'nature', 'news'];
    // from
    this.cancelButton = () => {
      console.log('cancel button');
    };

    this.saveButton = () => {
      console.log('save button');
    };
  }

  // --------------------------------------------------
  // LOAD component
  angular.module('app').component(moduleName, {
    templateUrl,
    controller: [...injection, controller],
  });
  // END module
  // eslint-disable-next-line
})();
