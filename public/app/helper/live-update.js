const reloadFunction = async () => {
  let repeat = true;
  while (repeat) {
    await fetch('http://127.0.0.1:9997').catch(() => (repeat = false));
    setTimeout(() => window.location.reload(false), 100);
  }
};

reloadFunction();
