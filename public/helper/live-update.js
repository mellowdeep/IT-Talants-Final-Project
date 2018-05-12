/* eslint-disable */
(function() {
  const reloadFunction = async () => {
    console.log('start', ~~(Math.random() * 100));
    let about = await fetch('http://localhost:3000/status-reload');
    about = about.test();
    console.log(about);
    // if (about.status === 200) window.location.reload(false);
  };
  setTimeout(reloadFunction, 500);
})();
