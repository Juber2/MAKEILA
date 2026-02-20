(function () {

  const root = document.getElementById("countdown");
  if (!root) return;

  const target = new Date(root.dataset.target);

  const elDays  = root.querySelector("[data-days]");
  const elHours = root.querySelector("[data-hours]");
  const elMins  = root.querySelector("[data-mins]");
  const elSecs  = root.querySelector("[data-secs]");

  const pad = n => String(n).padStart(2,"0");

  function update(){
    let diff = target.getTime() - Date.now();
    if (diff < 0) diff = 0;

    const total = Math.floor(diff/1000);

    elDays.textContent  = pad(Math.floor(total/86400));
    elHours.textContent = pad(Math.floor((total%86400)/3600));
    elMins.textContent  = pad(Math.floor((total%3600)/60));
    elSecs.textContent  = pad(total%60);
  }

  update();

  // sincronizado al segundo real (mejor práctica)
  (function loop(){
    update();
    setTimeout(loop, 1000 - (Date.now() % 1000));
  })();

})();

(() => {
  const el = document.querySelector('.butterfly');
  const img = el.querySelector('img');

  // Ajusta velocidad base (px por frame aprox). Más alto = más rápido
  const SPEED = 2.4;

  // Posición y dirección
  let x = 0, y = 0;
  let vx = SPEED, vy = SPEED * 0.8;

  // Arranque en posición random (cuando cargue el gif y ya tenga tamaño)
  function init() {
    const rect = el.getBoundingClientRect();
    const maxX = Math.max(0, window.innerWidth - rect.width);
    const maxY = Math.max(0, window.innerHeight - rect.height);

    x = Math.random() * maxX;
    y = Math.random() * maxY;

    // dirección random
    vx *= Math.random() < 0.5 ? -1 : 1;
    vy *= Math.random() < 0.5 ? -1 : 1;

    requestAnimationFrame(tick);
  }

  function tick() {
    const rect = el.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;

    x += vx;
    y += vy;

    // Rebote en bordes + pequeña variación para que no sea tan “perfecto”
    if (x <= 0) { x = 0; vx = Math.abs(vx) * (0.95 + Math.random() * 0.1); }
    if (x >= maxX) { x = maxX; vx = -Math.abs(vx) * (0.95 + Math.random() * 0.1); }

    if (y <= 0) { y = 0; vy = Math.abs(vy) * (0.95 + Math.random() * 0.1); }
    if (y >= maxY) { y = maxY; vy = -Math.abs(vy) * (0.95 + Math.random() * 0.1); }

    // Rotación ligera según dirección (opcional, se ve más “viva”)
    const angle = Math.atan2(vy, vx) * (180 / Math.PI);
    el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}deg)`;

    requestAnimationFrame(tick);
  }

  // Si cambia el tamaño de pantalla, mantenlo dentro de los límites
  window.addEventListener('resize', () => {
    const rect = el.getBoundingClientRect();
    x = Math.min(x, window.innerWidth - rect.width);
    y = Math.min(y, window.innerHeight - rect.height);
  }, { passive: true });

  // Espera a que cargue la imagen (para tener width/height reales)
  if (img.complete) init();
  else img.addEventListener('load', init, { once: true });
})();

