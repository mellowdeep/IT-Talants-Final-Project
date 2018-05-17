// eslint-disable-next-line
(function() {
  const moduleName = 'singleVideo';
  // eslint-disable-next-line
  const templateUrl = `/app/pages/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------

  function controller() {
    console.log(`${moduleName} started`);
    this.inputByUser = '';
    this.currentVideo = {};
    this.userSubmitComment = () => {
      console.log('userSubmitComment');
    };

    const createVideo = () => ({
      href: 'single-video-tabs.html',
      image: 'images/sv-4.png',
      duration: '15:19',
      title: 'Cornfield Chase Outlast II Official Gameplay',
      viewCount: '2,729,347',
      percent: 55,
    });

    const createComment = () => ({
      userName: 'Test user',
      userImage: 'images/ava8.png',
      userRef: '#/',
      text: 'asdfasdfd afd sdf sadf asd',
      dateAgo: 'Moth ago',
      countLikes: 54,
      countDislikes: 23,
    });

    this.recommendedVideos = [];
    let i = 10;
    while (i--) this.recommendedVideos.push(createVideo());

    this.channelVideos = [];
    i = 3;
    while (i--) this.channelVideos.push(createVideo());

    this.commentsToVideo = [];
    i = 15;
    while (i--) this.commentsToVideo.push(createComment());
  }

  // --------------------------------------------------
  // LOAD component
  angular.module('app').component(moduleName, { templateUrl, controller });
  // END module
  // eslint-disable-next-line
})();
