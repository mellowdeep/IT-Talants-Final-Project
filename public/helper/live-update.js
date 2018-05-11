/* eslint-disable */
(function() {
  const reloadFunction = async () => {
    console.log('start', ~~(Math.random() * 100));
    const about = await fetch('http://127.0.0.1:3000/status-reload');
    if (about.status === 200) window.location.reload(false);
  };
  setTimeout(reloadFunction, 500);
})();
