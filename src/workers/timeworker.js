let isRunning = false;

self.onmessage = function (event) {
  if (isRunning) return;

  isRunning = true;

  const state = event.data;
  const { activeTask, secondsRemaining } = state;

  // console.log('ARRIEGUAAA');
  // console.log(state);
  // console.log('ARRIEGUAAA');

  const endDate = activeTask.startDate + secondsRemaining * 1000;

  function Tick() {
    const agora = Date.now();
    const countDownSeconds = Math.round((endDate - agora) / 1000);
    self.postMessage(countDownSeconds);
    setTimeout(Tick, 1000);
  }

  Tick();
};
