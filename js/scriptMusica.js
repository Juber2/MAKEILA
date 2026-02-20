(function () {

const audio = document.getElementById('audio');
  const playBtn = document.getElementById('play');
  const icoPlay = document.getElementById('icoPlay');
  const icoPause = document.getElementById('icoPause');
  const progress = document.getElementById('progress');

  const shuffle = document.getElementById('shuffle');
  const repeat = document.getElementById('repeat');

  let isSeeking = false;

  // Play/Pause (en móvil debe ser por gesto: click)
  playBtn.addEventListener('click', async () => {
    try{
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
      syncPlayIcon();
    } catch (e) {
      console.log('play() falló:', e);
      // Si falla: normalmente es porque el audio no cargó o formato/ruta
    }
  });

  function syncPlayIcon(){
    const playing = !audio.paused;
    icoPlay.style.display = playing ? 'none' : 'block';
    icoPause.style.display = playing ? 'block' : 'none';
  }

  // Progreso -> UI
  audio.addEventListener('timeupdate', () => {
    if (isSeeking || !isFinite(audio.duration) || audio.duration === 0) return;
    progress.value = Math.floor((audio.currentTime / audio.duration) * 1000);
  });

  // UI -> Progreso (scrub)
  progress.addEventListener('input', () => { isSeeking = true; });
  progress.addEventListener('change', () => {
    if (!isFinite(audio.duration) || audio.duration === 0) return;
    const t = (progress.value / 1000) * audio.duration;
    audio.currentTime = t;
    isSeeking = false;
  });

  // Repeat (loop)
  repeat.addEventListener('click', () => {
    audio.loop = !audio.loop;
    repeat.classList.toggle('is-active', audio.loop);
  });

  // Shuffle (visual por ahora)
  // Si luego quieres playlist real, lo conectamos.
  shuffle.addEventListener('click', () => {
    shuffle.classList.toggle('is-active');
  });

  // Inicia icono correcto
  syncPlayIcon();

})();
