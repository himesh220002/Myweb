export interface GameRefs {
  canvas: HTMLCanvasElement;
  sensEl: HTMLInputElement;
  sensVal: HTMLElement;
  hudScore: HTMLElement;
  hudLives: HTMLElement;
  healthBar: HTMLElement;
  healthText: HTMLElement;
  autoToggleBtn: HTMLButtonElement;
  gameOverScreen: HTMLElement;
  finalScoreEl: HTMLElement;
  highScoreEl: HTMLElement;
  finalKillsEl: HTMLElement;
  finalTimeEl: HTMLElement;
  restartBtn: HTMLButtonElement;
  startScreen: HTMLElement;
  startBtn: HTMLButtonElement;
  pauseScreen: HTMLElement;
  resumeBtn: HTMLButtonElement;
  restartBtnPause: HTMLButtonElement;
  pauseScoreEl: HTMLElement;
  pauseHighEl: HTMLElement;
  container: HTMLElement;
  returnBtn: HTMLButtonElement;
  quitBtnGameOver: HTMLButtonElement;
  touchControls: HTMLElement;
  mobileToggle: HTMLElement;
}

export function initStarWarGame(refs: GameRefs) {
  const {
    canvas, sensEl, sensVal, hudScore, hudLives, healthBar, healthText,
    autoToggleBtn, gameOverScreen, finalScoreEl, highScoreEl, finalKillsEl, finalTimeEl,
    restartBtn, startScreen, startBtn, pauseScreen, resumeBtn, restartBtnPause,
    pauseScoreEl, pauseHighEl, container, returnBtn, quitBtnGameOver, touchControls, mobileToggle
  } = refs;

  const ctx = canvas.getContext('2d')!;
  const keys = new Set<string>();
  
  const shipImg = new Image();
  shipImg.src = '/assets/player-ship.png';
  const enemyImg = new Image();
  enemyImg.src = '/assets/enemy-ship.png';
  const midImg = new Image();
  midImg.src = '/assets/mid-ship.png';
  const bossImg = new Image();
  bossImg.src = '/assets/boss-ship.png';
  
  // Track listeners for cleanup
  const listeners: { target: EventTarget, type: string, fn: EventListener }[] = [];
  function addListen(target: EventTarget, type: string, fn: EventListener) {
    target.addEventListener(type, fn);
    listeners.push({ target, type, fn });
  }

  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2, isMouseDown = false;
  let sensitivity = 1;
  let autoShootEnabled = false;
  let started = false;
  let paused = false;

  function requestFullscreen() {
    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen().then(() => {
          if (screen.orientation && (screen.orientation as any).lock) {
            (screen.orientation as any).lock('landscape').catch(() => {});
          }
        }).catch((err) => console.error(err));
      } else if ((container as any).webkitRequestFullscreen) {
        (container as any).webkitRequestFullscreen();
      }
    } else {
      if (screen.orientation && (screen.orientation as any).lock) {
        (screen.orientation as any).lock('landscape').catch(() => {});
      }
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      requestFullscreen();
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }


  addListen(autoToggleBtn, 'click', () => { autoShootEnabled = !autoShootEnabled; updateAutoToggleUI(); });
  addListen(startBtn, 'click', () => { 
    started = true; paused = false; startScreen.classList.remove('show'); pauseScreen.classList.remove('show'); reset(); 
    requestFullscreen();
  });
  
  addListen(window, 'keydown', (ev: Event) => {
    const e = ev as KeyboardEvent;
    if (!started && (e.code === 'Space' || e.code === 'Enter')) { 
      started = true; paused = false; startScreen.classList.remove('show'); pauseScreen.classList.remove('show'); reset(); 
      requestFullscreen();
    }
  });

  function setPaused(v: boolean) {
    if (paused === v) return;
    if (!started || gameOver) return;
    paused = v;
    if (v) {
        pauseScoreEl.textContent = String(score);
        pauseHighEl.textContent = String(highScore);
        if (screen.orientation && (screen.orientation as any).unlock) {
            (screen.orientation as any).unlock();
        }
    } else {
        requestFullscreen();
    }
    pauseScreen.classList.toggle('show', paused);
    if (paused) lastTime = performance.now();
  }

  addListen(resumeBtn, 'click', () => setPaused(false));
  addListen(restartBtnPause, 'click', () => { 
    paused = false; pauseScreen.classList.remove('show'); reset(); 
    requestFullscreen();
  });
  
  function quitToMenu() {
    reset();
    started = false;
    paused = false;
    startScreen.classList.add('show');
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }
  
  addListen(returnBtn, 'click', quitToMenu);
  addListen(quitBtnGameOver, 'click', quitToMenu);

  function updateAutoToggleUI() {
    autoToggleBtn.textContent = autoShootEnabled ? 'AUTO: ON' : 'AUTO: OFF';
    autoToggleBtn.className = autoShootEnabled ? 'on' : 'off';
  }

  addListen(sensEl, 'input', () => { sensitivity = parseFloat(sensEl.value); sensVal.textContent = sensitivity.toFixed(2); });

  function resize() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const rect = container.getBoundingClientRect();
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    (canvas as any)._w = rect.width;
    (canvas as any)._h = rect.height;
  }
  addListen(window, 'resize', resize); 
  resize();

  addListen(container, 'mousemove', (ev: Event) => {
    const e = ev as MouseEvent;
    const rect = container.getBoundingClientRect();
    mouseX = e.clientX - rect.left; 
    mouseY = e.clientY - rect.top; 
  });
  addListen(container, 'mousedown', (ev: Event) => { const e = ev as MouseEvent; if (e.button === 0) isMouseDown = true; });
  addListen(window, 'mouseup', (ev: Event) => { const e = ev as MouseEvent; if (e.button === 0) isMouseDown = false; });
  addListen(container, 'contextmenu', (e: Event) => e.preventDefault());

  const stars = Array.from({ length: 140 }, () => ({ 
    x: Math.random() * ((canvas as any)._w || 1000), 
    y: Math.random() * ((canvas as any)._h || 1000), 
    s: Math.random() * 1.8 + 0.4, 
    sp: 12 + Math.random() * 28 
  }));

  let player: any, bullets: any[], enemyBullets: any[], enemies: any[], pickups: any[], popups: any[], powers: any[], explosions: any[];
  let score = 0, lives = 3, health = 100, kills = 0, startTime = 0, gameOver = false;
  let lastShot = 0, lastSpawn = 0, lastMidSpawn = 0, lastPickup = 0, lastPower = 0, lastMedkit = 0, lastBossSpawn = 0, lastTime = 0;
  let weaponPower: any = null, weaponExpire = 0;
  let ghostExpire = 0;
  let highScore = parseInt(localStorage.getItem('sd_high') || '0', 10);
  let respawnUntil = 0;
  
  function isRespawning(now: number) { return now < respawnUntil; }
  function isGhostActive(now: number) { return now < ghostExpire; }
  function getWeaponActive(now: number) { return weaponPower && now < weaponExpire ? weaponPower : null; }

  const PICKUP_TYPES = [
    { value: 50, color: '#ffd60a', glow: '#ffbe0b', size: 22, w: 22, h: 22 },
    { value: 100, color: '#00e5ff', glow: '#00b4d8', size: 28, w: 28, h: 28 },
    { value: 200, color: '#ff006e', glow: '#8338ec', size: 34, w: 34, h: 34 },
  ];
  const POWER_TYPES = [
    { type: 'burst', color: '#ff9500', glow: '#ff6a00', size: 28, w: 28, h: 28, label: 'BURST' },
    { type: 'missile', color: '#ff3b30', glow: '#ff0000', size: 30, w: 30, h: 30, label: 'MISSILE' },
    { type: 'auto', color: '#00e676', glow: '#00c853', size: 28, w: 28, h: 28, label: 'AUTO' },
    { type: 'ghost', color: '#b388ff', glow: '#7c4dff', size: 28, w: 28, h: 28, label: 'GHOST' },
  ];
  const MEDKIT_TYPE = { type: 'medkit', color: '#ff1744', glow: '#ff8a80', size: 26, w: 26, h: 26, label: 'MED KIT' };

  function makeCommonEnemy(W: number, H: number, now: number, score: number) {
    const base = 26 + Math.random() * 22 + Math.min(18, score * 0.08);
    const sp = Math.min(52, base);
    let x, y, vx, vy;
    const edge = Math.floor(Math.random() * 4), pad = 50;
    if (edge === 0) { x = Math.random() * W; y = -pad; vx = (Math.random() - 0.5) * 34; vy = Math.random() * sp * 0.5 + sp * 0.45; }
    else if (edge === 1) { x = W + pad; y = Math.random() * H; vx = -(Math.random() * sp * 0.5 + sp * 0.45); vy = (Math.random() - 0.5) * 34; }
    else if (edge === 2) { x = Math.random() * W; y = H + pad; vx = (Math.random() - 0.5) * 34; vy = -(Math.random() * sp * 0.5 + sp * 0.45); }
    else { x = -pad; y = Math.random() * H; vx = Math.random() * sp * 0.5 + sp * 0.45; vy = (Math.random() - 0.5) * 34; }
    const toCx = W / 2 - x, toCy = H / 2 - y, len = Math.hypot(toCx, toCy) || 1;
    vx += toCx / len * 6; vy += toCy / len * 6;
    return { x, y, w: 32, h: 28, hp: 1, maxHp: 1, speed: sp, vx, vy, angle: 0, lastShot: now + 700 + Math.random() * 900, type: 'common', color: '#f72585', score: 10 };
  }
  function makeMidEnemy(W: number, H: number, now: number, score: number) {
    const base = 26 + Math.random() * 22 + Math.min(18, score * 0.08);
    const commonSp = Math.min(52, base);
    const sp = commonSp * 0.4;
    let x, y, vx, vy;
    const edge = Math.floor(Math.random() * 4), pad = 55;
    if (edge === 0) { x = Math.random() * W; y = -pad; vx = (Math.random() - 0.5) * 24; vy = Math.random() * sp * 0.5 + sp * 0.45; }
    else if (edge === 1) { x = W + pad; y = Math.random() * H; vx = -(Math.random() * sp * 0.5 + sp * 0.45); vy = (Math.random() - 0.5) * 24; }
    else if (edge === 2) { x = Math.random() * W; y = H + pad; vx = (Math.random() - 0.5) * 24; vy = -(Math.random() * sp * 0.5 + sp * 0.45); }
    else { x = -pad; y = Math.random() * H; vx = Math.random() * sp * 0.5 + sp * 0.45; vy = (Math.random() - 0.5) * 24; }
    const toCx = W / 2 - x, toCy = H / 2 - y, len = Math.hypot(toCx, toCy) || 1;
    vx += toCx / len * 4; vy += toCy / len * 4;
    return { x, y, w: 44, h: 38, hp: 3, maxHp: 3, speed: sp, vx, vy, angle: 0, lastShot: now + 900 + Math.random() * 700, type: 'mid', color: '#ff9e00', score: 30 };
  }
  function makeBoss(W: number, H: number, now: number) {
    const x = W / 2, y = -120;
    return { x, y, w: 118, h: 86, hp: 30, maxHp: 30, speed: 16, vx: (Math.random() < 0.5 ? 1 : -1) * 18, vy: 14, angle: 0, lastShot: now + 600, lastRing: now, lastSpread: now, type: 'boss', color: '#9d00ff', score: 250, dir: Math.random() < 0.5 ? 1 : -1 };
  }

  function reset() {
    const W = (canvas as any)._w, H = (canvas as any)._h;
    player = { x: W / 2, y: H / 2, w: 34, h: 42, speed: 300, angle: -Math.PI / 2 };
    bullets = []; enemyBullets = []; enemies = []; pickups = []; popups = []; powers = []; explosions = []; score = 0; kills = 0; lives = 3; health = 100; gameOver = false; startTime = performance.now();
    weaponPower = null; weaponExpire = 0; ghostExpire = 0; respawnUntil = 0; paused = false;
    lastShot = lastSpawn = lastMidSpawn = lastPickup = lastPower = lastMedkit = lastBossSpawn = 0; lastTime = performance.now();
    mouseX = W / 2; mouseY = H / 2 - 120;
    stars.forEach(s => { s.x = Math.random() * W; s.y = Math.random() * H; });
    gameOverScreen.classList.remove('show');
    pauseScreen.classList.remove('show');
    updateAutoToggleUI();
  }

  // Initial setup for demo mode to prevent errors before first render
  player = { x: 500, y: 500, w: 34, h: 42, speed: 300, angle: 0 };
  bullets = []; enemyBullets = []; enemies = []; pickups = []; popups = []; powers = []; explosions = [];

  function loseLifeWithExplosion(now: number) {
    explosions.push({ x: player.x, y: player.y, r: 22, life: 0.65 });
    for (let k = 0; k < 8; k++) { const a = Math.random() * Math.PI * 2; explosions.push({ x: player.x + Math.cos(a) * 6, y: player.y + Math.sin(a) * 6, r: 8 + Math.random() * 8, life: 0.4 }); }
    lives--; health = 100;
    if (lives <= 0) { gameOver = true; respawnUntil = 0; showGameOver(); } else { respawnUntil = now + 2000; }
  }

  function showGameOver() {
    const elapsed = Math.floor((performance.now() - startTime) / 1000);
    finalScoreEl.textContent = String(score);
    finalKillsEl.textContent = String(kills);
    finalTimeEl.textContent = elapsed + 's';
    if (score > highScore) { highScore = score; localStorage.setItem('starwar_highscore', String(highScore)); }
    highScoreEl.textContent = String(highScore);
    gameOverScreen.classList.add('show');
  }

  function activatePower(type: string, now: number) {
    if (type === 'medkit') {
        if (health >= 90) {
            if (lives < 5) lives++;
            health = 100;
            popups.push({ x: player.x, y: player.y - 40, value: '+1 LIFE', life: 1, color: '#ff6b9d' });
        } else {
            health = 100;
            popups.push({ x: player.x, y: player.y - 40, value: 'HEALTH 100%', life: 1, color: '#00e676' });
        }
        return;
    }
    if (type === 'ghost') {
        ghostExpire = now + 15000;
        popups.push({ x: player.x, y: player.y - 40, value: 'GHOST 15s', life: 1.2, color: '#b388ff' });
        return;
    }
    weaponPower = type; weaponExpire = now + 15000;
    popups.push({ x: player.x, y: player.y - 40, value: type.toUpperCase() + ' 15s', life: 1.2, color: (POWER_TYPES.find(t => t.type === type) || MEDKIT_TYPE).color });
  }

  addListen(window, 'keydown', (ev: Event) => {
    const e = ev as KeyboardEvent;
    if (e.code === 'Escape' && started && !gameOver) {
        e.preventDefault();
        setPaused(!paused);
        return;
    }
    keys.add(e.code);
    if (['Space', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.code)) e.preventDefault();
    if (e.code === 'KeyR') { if (gameOver) { reset(); } }
    if (e.code === 'KeyF') {
        e.preventDefault();
        toggleFullscreen();
        if (!started) {
          started = true; paused = false; startScreen.classList.remove('show'); pauseScreen.classList.remove('show'); reset(); 
        }
    }
  });
  
  addListen(window, 'keyup', (e: any) => { if (!started) return; keys.delete(e.code); });
  
  // Mobile Touch Controls
  let mobileMode = false;
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  
  if (isTouchDevice) {
    mobileMode = true;
    touchControls.classList.add('show');
    mobileToggle.style.display = 'none';
    container.classList.add('mobile-mode');
    
    // Hide keyboard hints if they exist
    const hints = document.querySelectorAll('kbd, .hint');
    hints.forEach((h: any) => h.style.display = 'none');
  }
  
  addListen(mobileToggle, 'click', () => {
    mobileMode = !mobileMode;
    touchControls.classList.toggle('show', mobileMode);
  });

  const dpadBtns = touchControls.querySelectorAll('.dpad-btn');
  dpadBtns.forEach((btn: any) => {
    const code = btn.getAttribute('data-key');
    addListen(btn, 'touchstart', (e: any) => { e.preventDefault(); keys.add(code); btn.style.background = 'rgba(255,255,255,0.4)'; });
    addListen(btn, 'touchend', (e: any) => { e.preventDefault(); keys.delete(code); btn.style.background = ''; });
    addListen(btn, 'touchcancel', (e: any) => { e.preventDefault(); keys.delete(code); btn.style.background = ''; });
  });

  const moveJoystickBase = touchControls.querySelector('.move-joystick') as HTMLElement;
  const moveJoystickKnob = moveJoystickBase.querySelector('.joystick-knob') as HTMLElement;
  const aimJoystickBase = touchControls.querySelector('.aim-joystick') as HTMLElement;
  const aimJoystickKnob = aimJoystickBase.querySelector('.joystick-knob') as HTMLElement;
  
  let mjActive = false, mjId: number | null = null, mjcx = 0, mjcy = 0;
  let ajActive = false, ajId: number | null = null, ajcx = 0, ajcy = 0;
  let aimDx = 0, aimDy = 0;
  
  function updateMoveJoystick(touches: TouchList) {
    if (mjId === null) return;
    for (let i=0; i<touches.length; i++) {
      if (touches[i].identifier === mjId) {
        let dx = touches[i].clientX - mjcx;
        let dy = touches[i].clientY - mjcy;
        const dist = Math.hypot(dx, dy);
        const maxDist = 40;
        if (dist > maxDist) { dx = (dx / dist) * maxDist; dy = (dy / dist) * maxDist; }
        moveJoystickKnob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
        
        if (dx < -15) { keys.add('KeyA'); keys.delete('KeyD'); }
        else if (dx > 15) { keys.add('KeyD'); keys.delete('KeyA'); }
        else { keys.delete('KeyA'); keys.delete('KeyD'); }
        
        if (dy < -15) { keys.add('KeyW'); keys.delete('KeyS'); }
        else if (dy > 15) { keys.add('KeyS'); keys.delete('KeyW'); }
        else { keys.delete('KeyW'); keys.delete('KeyS'); }
        break;
      }
    }
  }

  function updateAimJoystick(touches: TouchList) {
    if (ajId === null) return;
    for (let i=0; i<touches.length; i++) {
      if (touches[i].identifier === ajId) {
        let dx = touches[i].clientX - ajcx;
        let dy = touches[i].clientY - ajcy;
        const dist = Math.hypot(dx, dy);
        const maxDist = 40;
        if (dist > maxDist) { dx = (dx / dist) * maxDist; dy = (dy / dist) * maxDist; }
        aimJoystickKnob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
        aimDx = dx; aimDy = dy;
        break;
      }
    }
  }

  addListen(moveJoystickBase, 'touchstart', (e: any) => {
    e.preventDefault(); if (mjActive) return;
    mjId = e.changedTouches[0].identifier; mjActive = true;
    const rect = moveJoystickBase.getBoundingClientRect();
    mjcx = rect.left + rect.width / 2; mjcy = rect.top + rect.height / 2;
    updateMoveJoystick(e.touches);
  });
  addListen(moveJoystickBase, 'touchmove', (e: any) => { e.preventDefault(); if (mjActive) updateMoveJoystick(e.touches); });

  addListen(aimJoystickBase, 'touchstart', (e: any) => {
    e.preventDefault(); if (ajActive) return;
    ajId = e.changedTouches[0].identifier; ajActive = true; isMouseDown = true;
    const rect = aimJoystickBase.getBoundingClientRect();
    ajcx = rect.left + rect.width / 2; ajcy = rect.top + rect.height / 2;
    updateAimJoystick(e.touches);
  });
  addListen(aimJoystickBase, 'touchmove', (e: any) => { e.preventDefault(); if (ajActive) updateAimJoystick(e.touches); });
  
  function handleTouchEnd(e: any) {
    for (let i=0; i<e.changedTouches.length; i++) {
      const id = e.changedTouches[i].identifier;
      if (id === mjId) {
        mjActive = false; mjId = null;
        moveJoystickKnob.style.transform = `translate(-50%, -50%)`;
        keys.delete('KeyW'); keys.delete('KeyA'); keys.delete('KeyS'); keys.delete('KeyD');
      }
      if (id === ajId) {
        ajActive = false; ajId = null; isMouseDown = false;
        aimJoystickKnob.style.transform = `translate(-50%, -50%)`;
        aimDx = 0; aimDy = 0;
      }
    }
  }
  
  addListen(window, 'touchend', handleTouchEnd);
  addListen(window, 'touchcancel', handleTouchEnd);
  
  addListen(restartBtn, 'click', () => {
    reset();
  });

  function hit(a: any, b: any) { return Math.abs(a.x - b.x) < (a.w + b.w) / 2 && Math.abs(a.y - b.y) < (a.h + b.h) / 2; }
  function rRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r); ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath(); }

  function update(now: number) {
    const W = (canvas as any)._w, H = (canvas as any)._h;
    const dt = Math.min((now - lastTime) / 1000, .05); lastTime = now;
    if (paused) return;
    stars.forEach(s => { s.y += s.sp * dt * (0.4 + sensitivity * 0.15); s.x += Math.sin(now * 0.0003 + s.x) * 2 * dt; if (s.y > H) { s.y = -4; s.x = Math.random() * W; } if (s.x < 0) s.x = W; if (s.x > W) s.x = 0; });
    
    if (!gameOver) {
        let mx = 0, my = 0;
        if (keys.has('ArrowUp') || keys.has('KeyW')) my -= 1;
        if (keys.has('ArrowDown') || keys.has('KeyS')) my += 1;
        if (keys.has('ArrowLeft') || keys.has('KeyA')) mx -= 1;
        if (keys.has('ArrowRight') || keys.has('KeyD')) mx += 1;
        if (mx || my) { const len = Math.hypot(mx, my) || 1; mx /= len; my /= len; const effSpeed = player.speed * (0.55 + sensitivity * 0.45) * (isGhostActive(now) ? 1.15 : 1); player.x += mx * effSpeed * dt; player.y += my * effSpeed * dt; }
        if (player && mobileMode) {
            if (ajActive) {
                mouseX = player.x + aimDx * 10;
                mouseY = player.y + aimDy * 10;
            } else {
                mouseX = player.x + Math.cos(player.angle - Math.PI / 2) * 100;
                mouseY = player.y + Math.sin(player.angle - Math.PI / 2) * 100;
            }
        }
        const margin = 22;
        player.x = Math.max(margin, Math.min(W - margin, player.x));
        player.y = Math.max(margin, Math.min(H - margin, player.y));
        const targetAngle = Math.atan2(mouseY - player.y, mouseX - player.x);
        let desired = targetAngle + Math.PI / 2;
        let diff = desired - player.angle;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        const turnSpeed = 6 + sensitivity * 7;
        player.angle += diff * Math.min(1, turnSpeed * dt);
        
        const weapon = getWeaponActive(now);
        const ghost = isGhostActive(now);
        if (weaponPower && now >= weaponExpire) weaponPower = null;
        if (ghostExpire && now >= ghostExpire) ghostExpire = 0;
        
        const wantShoot = isMouseDown || keys.has('Space');
        if (weapon === 'auto') {
            if (now - lastShot > 105) {
                let target = null, best = Infinity;
                for (const e of enemies) {
                    const d = Math.hypot(e.x - player.x, e.y - player.y);
                    const angTo = Math.atan2(e.y - player.y, e.x - player.x);
                    const aimErr = Math.abs(((angTo - targetAngle + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
                    const scoreD = d + aimErr * 60;
                    if (scoreD < best) { best = scoreD; target = e; }
                }
                if (target) {
                    const sp = 680;
                    const dx0 = target.x - player.x, dy0 = target.y - player.y, dist = Math.hypot(dx0, dy0) || 1;
                    const t = dist / sp;
                    const predX = target.x + (target.vx || 0) * t * 0.85;
                    const predY = target.y + (target.vy || 0) * t * 0.85;
                    const dx = predX - player.x, dy = predY - player.y, len = Math.hypot(dx, dy) || 1;
                    bullets.push({ x: player.x, y: player.y, w: 7, h: 13, vx: dx / len * sp, vy: dy / len * sp, type: 'auto' });
                    if (Math.random() < 0.35) {
                        const j = (Math.random() - 0.5) * 0.14;
                        const ang = Math.atan2(dy, dx) + j;
                        bullets.push({ x: player.x, y: player.y, w: 5, h: 11, vx: Math.cos(ang) * sp * 0.92, vy: Math.sin(ang) * sp * 0.92, type: 'auto' });
                    }
                } else {
                    const a = targetAngle; bullets.push({ x: player.x, y: player.y, w: 5, h: 16, vx: Math.cos(a) * 520, vy: Math.sin(a) * 520, type: 'normal' });
                }
                lastShot = now;
            }
        } else if ((wantShoot || autoShootEnabled) && now - lastShot > (weapon === 'missile' ? 420 : weapon === 'burst' ? 190 : 220)) {
            const a = targetAngle;
            if (weapon === 'burst') {
                const spread = 7 * Math.PI / 180;
                const sp = 520;
                [-spread, 0, spread].forEach(off => {
                    const ang = a + off;
                    bullets.push({ x: player.x, y: player.y, w: 5, h: 14, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, type: 'burst' });
                });
            } else if (weapon === 'missile') {
                bullets.push({ x: player.x, y: player.y, w: 10, h: 22, vx: Math.cos(a) * 380, vy: Math.sin(a) * 380, type: 'missile' });
            } else {
                bullets.push({ x: player.x, y: player.y, w: 5, h: 16, vx: Math.cos(a) * 520, vy: Math.sin(a) * 520, type: 'normal' });
            }
            lastShot = now;
        }

        if (started) {
            if (now - lastSpawn > Math.max(1300, 2200 - score * 6)) {
                enemies.push(makeCommonEnemy(W, H, now, score));
                lastSpawn = now;
            }
            if (now - lastMidSpawn > 8500 + Math.random() * 5000) {
                const midCount = enemies.filter(e => e.type === 'mid').length;
                if (midCount < 3) {
                    enemies.push(makeMidEnemy(W, H, now, score));
                    lastMidSpawn = now;
                }
            }
            if (now - lastBossSpawn > 180000 + Math.random() * 120000) {
                const hasBoss = enemies.some(e => e.type === 'boss');
                if (!hasBoss) {
                    enemies.push(makeBoss(W, H, now));
                    lastBossSpawn = now;
                    popups.push({ x: W / 2, y: H / 2 - 80, value: 'BOSS INCOMING!', life: 1.8, color: '#ff006e' });
                }
            }
            if (now - lastPickup > 2100 + Math.random() * 2700) {
                const r = Math.random(); const type = r < 0.6 ? PICKUP_TYPES[0] : r < 0.9 ? PICKUP_TYPES[1] : PICKUP_TYPES[2];
                pickups.push({ x: 30 + Math.random() * (W - 60), y: -30, w: type.w, h: type.h, value: type.value, color: type.color, glow: type.glow, size: type.size, speed: 72 + Math.random() * 38, angle: 0, spin: (Math.random() * 0.6 + 0.4) * (Math.random() < 0.5 ? 1 : -1) });
                lastPickup = now;
            }
            if (now - lastPower > 12000 + Math.random() * 6000) {
                let pool = POWER_TYPES;
                const pt = pool[Math.floor(Math.random() * pool.length)];
                powers.push({ x: 30 + Math.random() * (W - 60), y: -30, w: pt.w, h: pt.h, type: pt.type, color: pt.color, glow: pt.glow, size: pt.size, speed: 62 + Math.random() * 28, angle: 0, spin: 0.7 });
                lastPower = now;
            }
            if (now - lastMedkit > 30000 + Math.random() * 15000) {
                powers.push({ x: 30 + Math.random() * (W - 60), y: -30, w: MEDKIT_TYPE.w, h: MEDKIT_TYPE.h, type: 'medkit', color: MEDKIT_TYPE.color, glow: MEDKIT_TYPE.glow, size: MEDKIT_TYPE.size, speed: 58 + Math.random() * 22, angle: 0, spin: 0.5 });
                lastMedkit = now;
            }
        } else {
            enemies = enemies.filter(e => e.type === 'mid');
            const midCount = enemies.length;
            if (midCount < 1) {
                enemies.push(makeMidEnemy(W, H, now, 0));
            }
        }
        bullets.forEach(b => { b.x += (b.vx || 0) * dt; b.y += (b.vy || 0) * dt; });
        enemyBullets.forEach(b => { b.x += b.vx * dt; b.y += b.vy * dt; if (b.x0 === undefined) { b.x0 = b.x; b.y0 = b.y; } b.dist = Math.hypot(b.x - b.x0, b.y - b.y0); });
        pickups.forEach(p => { p.y += p.speed * dt; p.angle += p.spin * dt; });
        powers.forEach(pw => { pw.y += pw.speed * dt; pw.angle += pw.spin * dt; });
        explosions.forEach(ex => { ex.life -= dt; ex.r += (ex.maxR ? 420 : 140) * dt; });
        explosions = explosions.filter(ex => ex.life > 0);
        for (let i = enemies.length - 1; i >= 0; i--) {
            const e = enemies[i];
            if (e.type === 'boss') {
                e.x += e.vx * dt;
                e.y += e.vy * dt;
                if (e.y < 85) e.vy = 14;
                else {
                    e.vy = Math.sin(now * 0.0006 + e.x * 0.01) * 6;
                    if (e.x < 80) e.vx = 18;
                    if (e.x > W - 80) e.vx = -18;
                }
                e.vx += (Math.random() - 0.5) * 8 * dt;
                e.angle = Math.atan2(player.y - e.y, player.x - e.x) + Math.PI / 2;
                if (now - e.lastShot > 720) {
                    const dx = player.x - e.x, dy = player.y - e.y, len = Math.hypot(dx, dy) || 1;
                    const bsp = 105;
                    enemyBullets.push({ x: e.x, y: e.y + 22, w: 7, h: 7, vx: dx / len * bsp, vy: dy / len * bsp, x0: e.x, y0: e.y + 22 });
                    e.lastShot = now;
                }
                if (now - e.lastSpread > 2100) {
                    for (let k = -2; k <= 2; k++) {
                        const ang = Math.atan2(player.y - e.y, player.x - e.x) + k * 0.28;
                        enemyBullets.push({ x: e.x, y: e.y + 18, w: 7, h: 7, vx: Math.cos(ang) * 98, vy: Math.sin(ang) * 98, x0: e.x, y0: e.y + 18 });
                    }
                    e.lastSpread = now;
                }
                if (now - e.lastRing > 4600) {
                    for (let k = 0; k < 8; k++) { const ang = k * Math.PI / 4; enemyBullets.push({ x: e.x, y: e.y, w: 7, h: 7, vx: Math.cos(ang) * 88, vy: Math.sin(ang) * 88, x0: e.x, y0: e.y }); }
                    e.lastRing = now;
                }
            } else {
                e.vx += (Math.random() - 0.5) * 22 * dt;
                e.vy += (Math.random() - 0.5) * 22 * dt;
                const toPx = player.x - e.x, toPy = player.y - e.y, d = Math.hypot(toPx, toPy) || 1;
                e.vx += toPx / d * 7 * dt;
                e.vy += toPy / d * 7 * dt;
                const sp = Math.hypot(e.vx, e.vy);
                if (sp > e.speed) { e.vx = e.vx / sp * e.speed; e.vy = e.vy / sp * e.speed; }
                e.x += e.vx * dt; e.y += e.vy * dt;
                e.angle = Math.atan2(player.y - e.y, player.x - e.x) + Math.PI / 2;
                const eInterval = e.type === 'mid' ? 1650 + Math.random() * 900 : 2312 + Math.random() * 1625;
                const eSpeed = e.type === 'mid' ? (102 + Math.random() * 22) : (94 + Math.random() * 29);
                if (now - e.lastShot > eInterval) {
                    const dx = player.x - e.x, dy = player.y - e.y, len = Math.hypot(dx, dy) || 1;
                    if (e.type === 'mid') {
                        const baseAng = Math.atan2(dy, dx);
                        [-0.16, 0.16].forEach(off => {
                            const ang = baseAng + off;
                            enemyBullets.push({ x: e.x, y: e.y, w: 6, h: 6, vx: Math.cos(ang) * eSpeed, vy: Math.sin(ang) * eSpeed, x0: e.x, y0: e.y });
                        });
                    } else {
                        enemyBullets.push({ x: e.x, y: e.y, w: 7, h: 7, vx: dx / len * eSpeed, vy: dy / len * eSpeed, x0: e.x, y0: e.y });
                    }
                    e.lastShot = now;
                }
                if (e.x < -90 || e.x > W + 90 || e.y < -90 || e.y > H + 90) {
                    if (Math.hypot(e.x - W / 2, e.y - H / 2) > Math.max(W, H) * 0.95) { enemies.splice(i, 1); continue; }
                }
            }
        }
        for (let i = enemies.length - 1; i >= 0; i--) {
            const e = enemies[i];
            const bi = bullets.findIndex(b => hit(e, b));
            if (bi >= 0) {
                const b = bullets[bi]; bullets.splice(bi, 1);
                if (b.type === 'missile') {
                    const R = 336;
                    for (let j = enemies.length - 1; j >= 0; j--) {
                        if (j === i) continue; const o = enemies[j]; if (Math.hypot(o.x - e.x, o.y - e.y) < R) {
                            o.hp = (o.hp || 1) - 1; if (o.hp <= 0) { enemies.splice(j, 1); if (j < i) i--; score += o.score || 10; kills++; }
                        }
                    }
                    e.hp = (e.hp || 1) - 1;
                    if (e.hp <= 0) { enemies.splice(i, 1); score += e.score || 10; kills++; explosions.push({ x: e.x, y: e.y, r: 26, maxR: R, life: 0.72 }); }
                    else { explosions.push({ x: e.x, y: e.y, r: 14, life: 0.28 }); popups.push({ x: e.x, y: e.y - 18, value: e.hp + ' HP', life: 0.5, color: '#ff3b30' }); }
                    continue;
                } else {
                    e.hp = (e.hp || 1) - 1;
                    if (e.hp <= 0) { enemies.splice(i, 1); score += e.score || 10; kills++; explosions.push({ x: e.x, y: e.y, r: e.type === 'boss' ? 28 : 14, life: e.type === 'boss' ? 0.55 : 0.35 }); }
                    else { explosions.push({ x: e.x, y: e.y, r: 10, life: 0.2 }); }
                    continue;
                }
            }
            if (hit(e, player)) {
                if (!started || isGhostActive(now) || isRespawning(now)) {
                    if (e.type !== 'boss') { enemies.splice(i, 1); explosions.push({ x: e.x, y: e.y, r: 10, life: 0.28 }); }
                    continue;
                }
                if (e.type === 'boss') {
                    loseLifeWithExplosion(now);
                    const dx = player.x - e.x, dy = player.y - e.y, len = Math.hypot(dx, dy) || 1;
                    player.x += dx / len * 28; player.y += dy / len * 28;
                    continue;
                }
                enemies.splice(i, 1);
                loseLifeWithExplosion(now);
                continue;
            }
        }
        for (let i = enemyBullets.length - 1; i >= 0; i--) {
            const b = enemyBullets[i];
            if ((b.dist !== undefined && b.dist >= 700) || b.x < -20 || b.x > W + 20 || b.y < -20 || b.y > H + 20) {
                enemyBullets.splice(i, 1); continue;
            }
            if (hit({ x: player.x, y: player.y, w: 26, h: 26 }, b)) {
                enemyBullets.splice(i, 1);
                if (!started || isGhostActive(now) || isRespawning(now)) continue;
                health -= 20;
                if (health <= 0) {
                    health = 0;
                    loseLifeWithExplosion(now);
                } else {
                    explosions.push({ x: player.x, y: player.y, r: 9, life: 0.18 });
                    popups.push({ x: player.x, y: player.y - 28, value: '-20% HP', life: 0.7, color: '#ff5252' });
                }
            }
        }
        for (let i = pickups.length - 1; i >= 0; i--) { const p = pickups[i]; if (hit(p, player)) { score += p.value; popups.push({ x: p.x, y: p.y, value: p.value, life: 1, color: p.color }); pickups.splice(i, 1); continue; } if (p.y > H + 50) pickups.splice(i, 1); }
        for (let i = powers.length - 1; i >= 0; i--) { const pw = powers[i]; if (hit(pw, player)) { activatePower(pw.type, now); powers.splice(i, 1); continue; } if (pw.y > H + 50) powers.splice(i, 1); }
        popups.forEach(pt => { pt.y -= 45 * dt; pt.life -= dt; });
        popups = popups.filter(pt => pt.life > 0);
        bullets = bullets.filter(b => b.x > -40 && b.x < W + 40 && b.y > -40 && b.y < H + 40);
    }
    hudScore.textContent = 'SCORE ' + score;
    hudLives.textContent = '♥'.repeat(Math.max(0, lives));
    healthBar.style.width = Math.max(0, health) + '%';
    healthText.textContent = Math.max(0, Math.round(health)) + '%';
    if (health > 60) healthBar.style.background = 'linear-gradient(90deg, #00e676, #76ff03)';
    else if (health > 30) healthBar.style.background = 'linear-gradient(90deg, #ffd600, #ff9100)';
    else healthBar.style.background = 'linear-gradient(90deg, #ff3d00, #d50000)';
    if (isRespawning(now) && Math.floor(now / 100) % 2 === 0) healthBar.style.opacity = '0.35'; else healthBar.style.opacity = '1';
  }

  function ship(x: number, y: number, size: number, color: string, enemy = false, angle = 0, isPlayer = false) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    
    if (isPlayer && shipImg.complete && shipImg.naturalWidth > 0) {
      const sw = 32, sh = 32; 
      ctx.drawImage(shipImg, -sw/2, -sh/2, sw, sh);
    } else if (enemy && enemyImg.complete && enemyImg.naturalWidth > 0) {
      const ew = size * 0.9, eh = size * 0.9;
      ctx.drawImage(enemyImg, -ew/2, -eh/2, ew, eh);
    } else {
      ctx.fillStyle = color;
      ctx.beginPath();
      if (enemy) { ctx.moveTo(-size / 2, -size / 2); ctx.lineTo(size / 2, -size / 2); ctx.lineTo(size * .35, size / 2); ctx.lineTo(-size * .35, size / 2); }
      else { ctx.moveTo(0, -size / 2); ctx.lineTo(size / 2, size / 2); ctx.lineTo(0, size * .22); ctx.lineTo(-size / 2, size / 2); }
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#fff'; ctx.fillRect(-3, enemy ? -4 : 3, 6, 7);
    }
    
    ctx.restore();
  }

  function drawMidShip(e: any) {
    ctx.save(); ctx.translate(e.x, e.y); ctx.rotate(e.angle);
    if (midImg.complete && midImg.naturalWidth > 0) {
      const w = e.w * 2, h = e.h * 2.2;
      ctx.drawImage(midImg, -w/2, -h/2, w, h);
    } else {
      ctx.fillStyle = e.color; ctx.shadowBlur = 12; ctx.shadowColor = e.color;
      ctx.beginPath(); ctx.moveTo(-e.w / 2, -e.h / 2); ctx.lineTo(e.w / 2, -e.h / 2); ctx.lineTo(e.w * 0.42, e.h / 2); ctx.lineTo(-e.w * 0.42, e.h / 2); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#1a1a2e'; ctx.fillRect(-e.w * 0.28, -4, e.w * 0.56, 7);
      ctx.fillStyle = '#fff'; ctx.fillRect(-2, -6, 4, 5);
      ctx.shadowBlur = 0;
    }
    ctx.restore();
    if (e.hp < e.maxHp) {
        ctx.fillStyle = '#0008'; ctx.fillRect(e.x - e.w / 2, e.y - e.h / 2 - 10, e.w, 4);
        ctx.fillStyle = '#00e676'; ctx.fillRect(e.x - e.w / 2, e.y - e.h / 2 - 10, e.w * (e.hp / e.maxHp), 4);
    }
  }

  function drawBoss(e: any) {
    ctx.save(); ctx.translate(e.x, e.y);
    if (bossImg.complete && bossImg.naturalWidth > 0) {
      const w = e.w * 1.5, h = e.h * 1.3;
      ctx.drawImage(bossImg, -w/2, -h/2, w, h);
    } else {
      ctx.shadowBlur = 24; ctx.shadowColor = e.color;
      ctx.fillStyle = e.color;
      ctx.beginPath();
      ctx.moveTo(-e.w / 2, -e.h * 0.35); ctx.lineTo(e.w / 2, -e.h * 0.35); ctx.lineTo(e.w * 0.48, e.h * 0.15); ctx.lineTo(e.w * 0.22, e.h * 0.5); ctx.lineTo(-e.w * 0.22, e.h * 0.5); ctx.lineTo(-e.w * 0.48, e.h * 0.15);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#1a0033'; ctx.beginPath(); ctx.ellipse(0, -6, e.w * 0.22, 11, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#ff3b30'; ctx.shadowBlur = 12; ctx.beginPath(); ctx.arc(-e.w * 0.18, 4, 6, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(e.w * 0.18, 4, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 9px system-ui'; ctx.textAlign = 'center'; ctx.fillText('BOSS', 0, 8);
      ctx.shadowBlur = 0;
    }
    ctx.restore();
    const pct = e.hp / e.maxHp;
    ctx.fillStyle = '#000a'; ctx.fillRect(e.x - e.w / 2, e.y - e.h / 2 - 16, e.w, 7);
    ctx.fillStyle = pct > 0.5 ? '#00e676' : pct > 0.25 ? '#ffd600' : '#ff3b30'; ctx.fillRect(e.x - e.w / 2, e.y - e.h / 2 - 16, e.w * pct, 7);
    ctx.strokeStyle = '#fff3'; ctx.strokeRect(e.x - e.w / 2, e.y - e.h / 2 - 16, e.w, 7);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 8px system-ui'; ctx.textAlign = 'center'; ctx.fillText(e.hp + '/' + e.maxHp, e.x, e.y - e.h / 2 - 6);
  }

  function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerR: number, innerR: number, rotation: number) {
    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) { const r = i % 2 === 0 ? outerR : innerR; const a = rotation + (Math.PI / spikes) * i - Math.PI / 2; const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r; if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
    ctx.closePath();
  }

  function drawPickup(p: any) {
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.angle); ctx.shadowBlur = 14; ctx.shadowColor = p.glow;
    if (p.value === 50) { drawStar(ctx, 0, 0, 5, p.size / 2, p.size / 4.5, 0); ctx.fillStyle = p.color; ctx.fill(); ctx.shadowBlur = 0; ctx.strokeStyle = '#b77900'; ctx.lineWidth = 1.2; ctx.stroke(); ctx.fillStyle = '#fff8d0'; ctx.beginPath(); ctx.arc(-2.5, -3, 2.2, 0, Math.PI * 2); ctx.fill(); }
    else if (p.value === 100) { drawStar(ctx, 0, 0, 6, p.size / 2, p.size / 3.2, 0); ctx.fillStyle = p.color; ctx.fill(); ctx.shadowBlur = 0; ctx.strokeStyle = '#aaf7ff'; ctx.lineWidth = 1.4; ctx.stroke(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, 3.5, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#007a8a'; ctx.beginPath(); ctx.arc(0, 0, 1.6, 0, Math.PI * 2); ctx.fill(); }
    else { drawStar(ctx, 0, 0, 8, p.size / 2, p.size / 4.2, 0); ctx.fillStyle = p.color; ctx.fill(); ctx.shadowBlur = 0; ctx.strokeStyle = '#ffd6ff'; ctx.lineWidth = 1.6; ctx.stroke(); ctx.save(); ctx.rotate(Math.PI / 4); ctx.fillStyle = '#ffffffee'; drawStar(ctx, 0, 0, 4, p.size / 3.2, p.size / 6, 0); ctx.fill(); ctx.restore(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, 2.8, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
    ctx.save(); ctx.font = 'bold 11px system-ui'; ctx.textAlign = 'center'; ctx.fillStyle = '#fff'; ctx.strokeStyle = '#0008'; ctx.lineWidth = 3; ctx.strokeText(String(p.value), p.x, p.y + p.size / 2 + 12); ctx.fillText(String(p.value), p.x, p.y + p.size / 2 + 12); ctx.restore();
  }

  function drawPower(pw: any) {
    ctx.save(); ctx.translate(pw.x, pw.y); ctx.rotate(pw.angle * 0.4); ctx.shadowBlur = 18; ctx.shadowColor = pw.glow;
    ctx.fillStyle = '#0b1020'; ctx.strokeStyle = pw.color; ctx.lineWidth = 2.2; const s = pw.size; rRect(ctx, -s / 1.35, -s / 1.35, s * 1.48, s * 1.48, 7); ctx.fill(); ctx.stroke(); ctx.shadowBlur = 0;
    if (pw.type === 'burst') { ctx.fillStyle = pw.color;[[-8, -2], [0, -7], [8, -2]].forEach(([ox, oy]) => { rRect(ctx, ox - 3, oy - 6, 6, 13, 2); ctx.fill(); }); ctx.fillStyle = '#fff'; ctx.font = 'bold 7px system-ui'; ctx.textAlign = 'center'; ctx.fillText('BURST', 0, 12); }
    else if (pw.type === 'missile') { ctx.fillStyle = pw.color; ctx.beginPath(); ctx.moveTo(0, -12); ctx.lineTo(7, -2); ctx.lineTo(5, 10); ctx.lineTo(-5, 10); ctx.lineTo(-7, -2); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(0, -12); ctx.lineTo(3, -6); ctx.lineTo(-3, -6); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#ffcc00'; ctx.fillRect(-3.5, 10, 7, 3); ctx.fillStyle = '#fff'; ctx.font = 'bold 6px system-ui'; ctx.textAlign = 'center'; ctx.fillText('BOOM', 0, 13.5); }
    else if (pw.type === 'auto') { ctx.strokeStyle = pw.color; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.arc(0, -1, 10, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, -11); ctx.lineTo(0, 9); ctx.moveTo(-10, -1); ctx.lineTo(10, -1); ctx.stroke(); ctx.fillStyle = pw.color; ctx.beginPath(); ctx.arc(0, -1, 3, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(1.2, -2, 1, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = 'bold 7px system-ui'; ctx.textAlign = 'center'; ctx.fillText('AUTO', 0, 14); }
    else if (pw.type === 'ghost') { ctx.fillStyle = '#e9e6ff'; ctx.beginPath(); ctx.arc(0, -4, 9, Math.PI, 0); ctx.lineTo(9, 8); ctx.lineTo(6.5, 5); ctx.lineTo(3.5, 8); ctx.lineTo(0, 5); ctx.lineTo(-3.5, 8); ctx.lineTo(-6.5, 5); ctx.lineTo(-9, 8); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#2a2740'; ctx.beginPath(); ctx.arc(-3.5, -4, 2, 0, Math.PI * 2); ctx.arc(3.5, -4, 2, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#a99cff'; ctx.font = 'bold 6px system-ui'; ctx.textAlign = 'center'; ctx.fillText('GHOST', 0, 14); }
    else if (pw.type === 'medkit') { ctx.fillStyle = '#fff'; rRect(ctx, -11, -9, 22, 18, 4); ctx.fill(); ctx.strokeStyle = pw.color; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = pw.color; ctx.fillRect(-3, -7, 6, 14); ctx.fillRect(-9, -3, 18, 6); ctx.fillStyle = '#fff'; ctx.font = 'bold 6px system-ui'; ctx.textAlign = 'center'; ctx.fillText('+LIFE', 0, 15); }
    ctx.restore();
    ctx.save(); ctx.font = 'bold 9px system-ui'; ctx.textAlign = 'center'; ctx.fillStyle = '#fff'; ctx.strokeStyle = '#000a'; ctx.lineWidth = 3; ctx.strokeText(pw.type === 'medkit' ? 'MED KIT' : pw.type.toUpperCase(), pw.x, pw.y + pw.size / 1.1 + 14); ctx.fillText(pw.type === 'medkit' ? 'MED KIT' : pw.type.toUpperCase(), pw.x, pw.y + pw.size / 1.1 + 14); ctx.restore();
  }

  function draw() {
    const W = (canvas as any)._w, H = (canvas as any)._h;
    ctx.clearRect(0, 0, W, H);
    const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H)); bg.addColorStop(0, '#0f1f4a'); bg.addColorStop(1, '#020510'); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#d9efff'; stars.forEach(s => ctx.fillRect(s.x, s.y, s.s, s.s));
    ctx.save(); ctx.strokeStyle = '#4cc9f0aa'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(mouseX - 12, mouseY); ctx.lineTo(mouseX - 4, mouseY); ctx.moveTo(mouseX + 4, mouseY); ctx.lineTo(mouseX + 12, mouseY); ctx.moveTo(mouseX, mouseY - 12); ctx.lineTo(mouseX, mouseY - 4); ctx.moveTo(mouseX, mouseY + 4); ctx.lineTo(mouseX, mouseY + 12); ctx.stroke(); ctx.strokeStyle = '#ffffff66'; ctx.beginPath(); ctx.arc(mouseX, mouseY, 14, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    if (getWeaponActive(performance.now()) === 'auto' && enemies.length) {
        let tgt = null, best = Infinity;
        for (const e of enemies) { const d = Math.hypot(e.x - player.x, e.y - player.y); const angTo = Math.atan2(e.y - player.y, e.x - player.x); const aimErr = Math.abs(((angTo - Math.atan2(mouseY - player.y, mouseX - player.x) + Math.PI * 3) % (Math.PI * 2)) - Math.PI); const scoreD = d + aimErr * 60; if (scoreD < best) { best = scoreD; tgt = e; } }
        if (tgt) {
            ctx.save(); ctx.strokeStyle = '#00e676'; ctx.lineWidth = 2; ctx.setLineDash([5, 3]); ctx.beginPath(); ctx.arc(tgt.x, tgt.y, 22 + Math.sin(performance.now() * 0.01) * 2, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]); ctx.strokeStyle = '#ffffffaa'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(tgt.x - 14, tgt.y); ctx.lineTo(tgt.x - 6, tgt.y); ctx.moveTo(tgt.x + 6, tgt.y); ctx.lineTo(tgt.x + 14, tgt.y); ctx.moveTo(tgt.x, tgt.y - 14); ctx.lineTo(tgt.x, tgt.y - 6); ctx.moveTo(tgt.x, tgt.y + 6); ctx.lineTo(tgt.x, tgt.y + 14); ctx.stroke();
            const sp = 680, dx0 = tgt.x - player.x, dy0 = tgt.y - player.y, dist = Math.hypot(dx0, dy0) || 1, t = dist / sp;
            const predX = tgt.x + (tgt.vx || 0) * t * 0.85, predY = tgt.y + (tgt.vy || 0) * t * 0.85;
            ctx.fillStyle = '#00e67688'; ctx.beginPath(); ctx.arc(predX, predY, 3, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
        }
    }
    bullets.forEach(b => {
        const ang = Math.atan2(b.vy || -1, b.vx || 0);
        const isMissile = b.type === 'missile';
        const radius = isMissile ? 6.5 : 5.2;
        const ballColor = b.type === 'burst' ? '#ffb700' : b.type === 'missile' ? '#ff3b30' : b.type === 'auto' ? '#7affb0' : '#8befff';
        const flick = 0.9 + Math.sin(performance.now() * 0.018 + b.x * 0.11) * 0.18 + Math.cos(performance.now() * 0.022 + b.y * 0.09) * 0.10;
        ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(ang); ctx.translate(-10, 0);
        ctx.shadowBlur = 12; ctx.shadowColor = isMissile ? '#ff0000' : '#ff6a00';
        ctx.fillStyle = isMissile ? '#ff2e00' : '#ff6a00';
        ctx.beginPath(); ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-5 * flick, -3.8 * flick, -11 * flick, 0);
        ctx.quadraticCurveTo(-5 * flick, 3.8 * flick, 0, 0);
        ctx.fill();
        ctx.fillStyle = '#ffe66d'; ctx.shadowBlur = 6; ctx.shadowColor = '#ffeb3b';
        ctx.beginPath(); ctx.moveTo(-1, 0);
        ctx.quadraticCurveTo(-4 * flick, -2.1 * flick, -8 * flick, 0);
        ctx.quadraticCurveTo(-4 * flick, 2.1 * flick, -1, 0);
        ctx.fill();
        ctx.fillStyle = '#ffffff'; ctx.shadowBlur = 0;
        ctx.beginPath(); ctx.ellipse(-3.2, 0, 1.1, 0.8, 0, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
        ctx.save(); ctx.shadowBlur = 16; ctx.shadowColor = ballColor;
        ctx.fillStyle = ballColor; ctx.beginPath(); ctx.arc(b.x, b.y, radius, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0; ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(b.x + 1.2, b.y - 1.2, 1.5, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#ffffffcc'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(b.x, b.y, radius, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
    });
    enemyBullets.forEach(b => {
        let alpha = 1;
        if (b.dist !== undefined && b.dist > 600) {
            alpha = Math.max(0, (700 - b.dist) / 100);
        }
        ctx.save(); ctx.globalAlpha = alpha; ctx.fillStyle = '#ff3b30'; ctx.shadowBlur = 8; ctx.shadowColor = '#ff2a2a'; ctx.beginPath(); ctx.arc(b.x, b.y, 3.5, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(b.x + 1, b.y - 1, 1.2, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    });
    enemies.forEach(e => {
        if (e.type === 'mid') drawMidShip(e);
        else if (e.type === 'boss') drawBoss(e);
        else ship(e.x, e.y, e.w, e.color, true, e.angle);
    });
    explosions.forEach(ex => { ctx.save(); ctx.globalAlpha = Math.max(0, ex.life / 0.65); const g = ctx.createRadialGradient(ex.x, ex.y, ex.r * 0.2, ex.x, ex.y, ex.r); g.addColorStop(0, '#fff'); g.addColorStop(0.25, '#ffe66d'); g.addColorStop(0.55, '#ff3b30'); g.addColorStop(1, '#0000'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(ex.x, ex.y, ex.r, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#ff9500'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(ex.x, ex.y, ex.r * 0.7, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); });
    pickups.forEach(p => drawPickup(p));
    powers.forEach(pw => drawPower(pw));
    const nowDraw = performance.now();
    const weapon = getWeaponActive(nowDraw);
    const ghost = isGhostActive(nowDraw);
    const respawning = isRespawning(nowDraw);
    const blinkSkip = respawning && Math.floor(nowDraw / 90) % 2 === 0;
    if (!blinkSkip) {
        if (ghost) {
            ctx.save(); ctx.globalAlpha = 0.52 + Math.sin(nowDraw * 0.015) * 0.18; ctx.shadowBlur = 22; ctx.shadowColor = '#b388ff'; ship(player.x, player.y, player.w, '#d6ccff', false, player.angle, true); ctx.restore();
            ctx.save(); ctx.strokeStyle = '#b388ff88'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(player.x, player.y, 26 + Math.sin(nowDraw * 0.008) * 4, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
        } else if (respawning) {
            ctx.save(); ctx.globalAlpha = 0.35 + Math.sin(nowDraw * 0.02) * 0.12; ctx.shadowBlur = 18; ctx.shadowColor = '#ffffff';
            ship(player.x, player.y, player.w, '#ffffff', false, player.angle, true); ctx.restore();
            ctx.save(); ctx.globalAlpha = 0.78;
            ship(player.x, player.y, player.w, '#4cc9f0', false, player.angle, true); ctx.restore();
        } else {
            ship(player.x, player.y, player.w, '#4cc9f0', false, player.angle, true);
            const a = player.angle - Math.PI / 2; const tx = player.x - Math.cos(a) * 18, ty = player.y - Math.sin(a) * 18;
            ctx.save(); ctx.fillStyle = '#ff9500aa'; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(tx + Math.cos(a + 2.4) * 10, ty + Math.sin(a + 2.4) * 10); ctx.lineTo(tx + Math.cos(a - 2.4) * 10, ty + Math.sin(a - 2.4) * 10); ctx.closePath(); ctx.fill(); ctx.restore();
        }
    }
    popups.forEach(pt => {
        ctx.save(); ctx.globalAlpha = Math.max(0, pt.life); const isLife = String(pt.value).includes('LIFE') || String(pt.value).includes('BURST') || String(pt.value).includes('MISSILE') || String(pt.value).includes('AUTO') || String(pt.value).includes('GHOST'); ctx.font = isLife ? 'bold 16px system-ui' : 'bold 18px system-ui'; ctx.textAlign = 'center'; ctx.strokeStyle = '#000a'; ctx.lineWidth = 4; ctx.strokeText(`${String(pt.value).startsWith('+') || isLife ? '' : '+'}${pt.value}`, pt.x, pt.y); ctx.fillStyle = pt.color; ctx.fillText(`${String(pt.value).startsWith('+') || isLife ? '' : '+'}${pt.value}`, pt.x, pt.y); ctx.restore();
    });
    if (weapon || ghost) {
        const W2 = (canvas as any)._w;
        let txt = '', col = '#fff', pct = 0;
        if (weapon && ghost) {
            const rW = Math.max(0, (weaponExpire - nowDraw) / 1000), rG = Math.max(0, (ghostExpire - nowDraw) / 1000);
            txt = weapon.toUpperCase() + '+GHOST ' + Math.min(rW, rG).toFixed(1) + 's';
            col = POWER_TYPES.find(t => t.type === weapon)?.color || '#fff';
            pct = Math.min(rW, rG) / 15;
        } else if (weapon) {
            const r = Math.max(0, (weaponExpire - nowDraw) / 1000); txt = weapon.toUpperCase() + ' ' + r.toFixed(1) + 's'; col = POWER_TYPES.find(t => t.type === weapon)?.color || '#fff'; pct = r / 15;
        } else { const r = Math.max(0, (ghostExpire - nowDraw) / 1000); txt = 'GHOST ' + r.toFixed(1) + 's'; col = '#b388ff'; pct = r / 15; }
        ctx.save(); ctx.fillStyle = '#0009'; rRect(ctx, W2 / 2 - 140, 60, 280, 22, 8); ctx.fill();
        ctx.fillStyle = col; ctx.font = 'bold 12px system-ui'; ctx.textAlign = 'left'; ctx.fillText(txt, W2 / 2 - 128, 75);
        ctx.fillStyle = '#ffffff33'; ctx.fillRect(W2 / 2 - 20, 70, 120, 4);
        ctx.fillStyle = col; ctx.fillRect(W2 / 2 - 20, 70, 120 * pct, 4);
        ctx.restore();
    }
    if (gameOver) {
        ctx.fillStyle = '#0006'; ctx.fillRect(0, 0, W, H);
    }
  }

  let animationFrameId: number;
  function loop(now: number) { 
    update(now); 
    draw(); 
    animationFrameId = requestAnimationFrame(loop); 
  }
  
  reset(); 
  animationFrameId = requestAnimationFrame(loop);

  return function cleanup() {
    cancelAnimationFrame(animationFrameId);
    listeners.forEach(({ target, type, fn }) => {
      target.removeEventListener(type, fn);
    });
  };
}
