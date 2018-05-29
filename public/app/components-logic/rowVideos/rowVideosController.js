// eslint-disable-next-line
(function() {
  const moduleName = 'rowVideos';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------

  const bindings = {
    user: '<',
    initData: '<',
    headTitle: '@',
    playlists: '=',
    initDataReady: '=',
  };
  function controller() {
    console.log(`${moduleName} started`);

    this.myInterval = 0;
    this.noWrapSlides = false;
    this.active = 0;
    this.sliders = [];
    this.sliderIndex = 0;
    this.sliderDelta = 4;

    this.update = () => {
      this.initDataReady
        .then(() => {
          console.log('data', this.initData);
          this.sliders.length = 0;
          while (this.sliderIndex * this.sliderDelta < this.initData.length) {
            if (
              (this.sliderIndex + 1) * this.sliderDelta >
              this.initData.length
            ) {
              this.sliders.push({
                data: this.initData.slice(
                  this.initData.length - this.sliderDelta >= 0
                    ? this.initData.length - this.sliderDelta
                    : 0,
                  this.initData.length,
                ),
                sliderIndex: this.sliderIndex,
              });
            } else
              this.sliders.push({
                data: this.initData.slice(
                  this.sliderIndex * this.sliderDelta,
                  (this.sliderIndex + 1) * this.sliderDelta,
                ),
                sliderIndex: this.sliderIndex,
              });

            this.sliderIndex += 1;
          } // while
        })
        .then(() => {
          console.log(this.sliders);
        });
    };

    this.$postLink = () => {
      this.update();
      // console.log(this.initDataReady);
      // update();
    };

    // let slides = (this.slides = []);
    // let currIndex = 0;

    // this.videoList = [];

    // "user_id": 1,
    // "name": "Title",
    // "play_count": 0,
    // "about": "about",
    // "id": 5,
    // "image": null,
    // "status": "pending",
    // "likes_count": 0,
    // "dislikes_count": 0,
    // "post_date": "2018-5-19",
    // "tag": "news",
    // "uuid": "E5LwvQeC",
    // "visibility": "public",
    // "low_quality": null,
    // "high_quality": null,
    // "duration": null

    // this.videoList
    // this.sort
    // let i = 8;
    // while (i) {
    //   this.videoList.push({
    //     image: 'images/video1-1.png',
    //     href: '#/',
    //     time: '3:50',
    //     title: "YoMan's Sky: 21 Minutes of New Gameplay - IGN First",
    //     views: '27,548',
    //     likeRate: '78%',
    //     watched: Math.round(Math.random()),
    //   });
    //   i -= 1;
    // }
  }

  // --------------------------------------------------
  // LOAD component
  angular
    .module('app')
    .component(moduleName, { templateUrl, controller, bindings });
  // END module
  // eslint-disable-next-line
})();
