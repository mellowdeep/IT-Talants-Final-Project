// eslint-disable-next-line
(function() {
  const moduleName = 'test';
  // eslint-disable-next-line
  const templateUrl = `/app/pages/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------
  const bindings = {};
  const injection = ['dataService', '$window', 'linkService'];
  function controller(dataService, $window, linkService) {
    console.log(`${moduleName} started`);

    this.myInterval = 5000;
    this.noWrapSlides = false;
    this.active = 0;
    let slides = (this.slides = []);
    let currIndex = 0;

    this.addSlide = function() {
      var newWidth = 600 + slides.length + 1;
      slides.push({
        image: '//unsplash.it/' + newWidth + '/300',
        text: [
          'Nice image',
          'Awesome photograph',
          'That is so cool',
          'I love that',
        ][slides.length % 4],
        id: currIndex++,
      });
    };

    for (var i = 0; i < 4; i++) {
      this.addSlide();
    }

    // Randomize logic below
  }

  // --------------------------------------------------
  // LOAD component
  angular.module('app').component(moduleName, {
    templateUrl,
    controller: [...injection, controller],
    bindings,
  });
  // END module
  // eslint-disable-next-line
})();
