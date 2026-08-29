"use client";

import React, { useEffect, useRef } from "react";
import styles from "./StarWar.module.css";
import { initStarWarGame, GameRefs } from "./gameEngine";

export default function StarWarGame() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Refs for all game UI elements
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sensElRef = useRef<HTMLInputElement>(null);
  const sensValRef = useRef<HTMLSpanElement>(null);
  const hudScoreRef = useRef<HTMLSpanElement>(null);
  const hudLivesRef = useRef<HTMLSpanElement>(null);
  const healthBarRef = useRef<HTMLDivElement>(null);
  const healthTextRef = useRef<HTMLDivElement>(null);
  const autoToggleBtnRef = useRef<HTMLButtonElement>(null);

  const gameOverScreenRef = useRef<HTMLDivElement>(null);
  const finalScoreElRef = useRef<HTMLDivElement>(null);
  const highScoreElRef = useRef<HTMLDivElement>(null);
  const finalKillsElRef = useRef<HTMLDivElement>(null);
  const finalTimeElRef = useRef<HTMLDivElement>(null);
  const restartBtnRef = useRef<HTMLButtonElement>(null);

  const startScreenRef = useRef<HTMLDivElement>(null);
  const startBtnRef = useRef<HTMLButtonElement>(null);

  const pauseScreenRef = useRef<HTMLDivElement>(null);
  const resumeBtnRef = useRef<HTMLButtonElement>(null);
  const restartBtnPauseRef = useRef<HTMLButtonElement>(null);
  const pauseScoreElRef = useRef<HTMLSpanElement>(null);
  const pauseHighElRef = useRef<HTMLSpanElement>(null);
  const touchControlsRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const returnBtnRef = useRef<HTMLButtonElement>(null);
  const quitBtnGameOverRef = useRef<HTMLButtonElement>(null);
  const inGameHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure all refs are attached
    if (
      !containerRef.current || !canvasRef.current || !sensElRef.current ||
      !sensValRef.current || !hudScoreRef.current || !hudLivesRef.current ||
      !healthBarRef.current || !healthTextRef.current ||
      !autoToggleBtnRef.current || !gameOverScreenRef.current || !finalScoreElRef.current ||
      !highScoreElRef.current || !finalKillsElRef.current || !finalTimeElRef.current ||
      !restartBtnRef.current || !startScreenRef.current || !startBtnRef.current ||
      !pauseScreenRef.current || !resumeBtnRef.current || !restartBtnPauseRef.current ||
      !pauseScoreElRef.current || !pauseHighElRef.current || !touchControlsRef.current || !mobileToggleRef.current || !returnBtnRef.current ||
      !quitBtnGameOverRef.current
    ) {
      return;
    }

    const refs: GameRefs = {
      container: containerRef.current,
      canvas: canvasRef.current,
      sensEl: sensElRef.current,
      sensVal: sensValRef.current,
      hudScore: hudScoreRef.current,
      hudLives: hudLivesRef.current,
      healthBar: healthBarRef.current,
      healthText: healthTextRef.current,
      autoToggleBtn: autoToggleBtnRef.current,
      gameOverScreen: gameOverScreenRef.current,
      finalScoreEl: finalScoreElRef.current,
      highScoreEl: highScoreElRef.current,
      finalKillsEl: finalKillsElRef.current,
      finalTimeEl: finalTimeElRef.current,
      restartBtn: restartBtnRef.current,
      startScreen: startScreenRef.current,
      startBtn: startBtnRef.current,
      pauseScreen: pauseScreenRef.current,
      resumeBtn: resumeBtnRef.current,
      restartBtnPause: restartBtnPauseRef.current,
      returnBtn: returnBtnRef.current,
      pauseScoreEl: pauseScoreElRef.current,
      pauseHighEl: pauseHighElRef.current,
      touchControls: touchControlsRef.current,
      mobileToggle: mobileToggleRef.current,
      quitBtnGameOver: quitBtnGameOverRef.current,
    };

    const cleanup = initStarWarGame(refs);
    return cleanup;
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className="game-wrap">
        <button id="mobileToggle" ref={mobileToggleRef} className="mobile-toggle block md:hidden" title="Toggle Mobile Controls">
          🎮
        </button>
        <button className="mobile-pause" title="Pause Game" onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }))}>
          ⏸
        </button>
        <canvas id="game" ref={canvasRef} aria-label="Star Defender game"></canvas>
        <div id="touchControls" ref={touchControlsRef}>
          {/* Movement Joystick */}
          <div className="joystick-base move-joystick" style={{ left: '20px', bottom: '40px' }}>
            <div className="joystick-knob"></div>
          </div>
          {/* Aiming Joystick */}
          <div className="joystick-base aim-joystick" style={{ right: '20px', bottom: '40px' }}>
            <div className="joystick-knob"></div>
          </div>
        </div>
        <div id="hud">
          <label htmlFor="sens">SHIP SPEED</label>
          <input id="sens" ref={sensElRef} type="range" min="0.2" max="2.8" step="0.05" defaultValue="1" />
          <span id="sensVal" ref={sensValRef}>1.00</span>
          <span className="sep"></span>
          <span className="stat" id="hudScore" ref={hudScoreRef}>SCORE 0</span>
          <span className="stat" id="hudLives" ref={hudLivesRef}>♥♥♥</span>
          <div id="healthWrap">
            <div id="healthBar" ref={healthBarRef}></div>
            <div id="healthText" ref={healthTextRef}>100%</div>
          </div>
          <button id="autoToggle" ref={autoToggleBtnRef} className="off" title="Toggle auto-shoot towards aim w-full">
            AUTO: OFF
          </button>
        </div>
        <p className="hint">Move: <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> / Arrows · Aim: <kbd>Mouse</kbd> · Fire: <kbd>Click</kbd> / <kbd>Space</kbd> · Pause: <kbd>ESC</kbd> · <span className="highlight-hint">Fullscreen: <kbd>F</kbd></span></p>
      </div>

      <div id="gameOverScreen" ref={gameOverScreenRef}>
        <h1 className="bg-text">DEFEAT</h1>
        <div id="goContent">
          <div className="top-high-score">HIGH SCORE: <span id="highScore" ref={highScoreElRef}>0</span></div>
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-label">FINAL SCORE</div>
              <div className="stat-value" id="finalScore" ref={finalScoreElRef}>0</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">ENEMIES</div>
              <div className="stat-value" id="finalKills" ref={finalKillsElRef}>0</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">TIME</div>
              <div className="stat-value" id="finalTime" ref={finalTimeElRef}>0s</div>
            </div>
          </div>
          <div className="go-buttons flex flex-col items-center gap-6 ">
            <button id="restartBtn" ref={restartBtnRef} className="val-btn w-[300px]">
              <span className="btn-bg"></span>
              <span className="btn-text">PLAY AGAIN</span>
            </button>
            <button id="quitBtnGameOver" ref={quitBtnGameOverRef} className="val-btn val-btn-alt">
              <span className="btn-bg"></span>
              <span className="btn-text">QUIT TO MENU</span>
            </button>
          </div>
        </div>
      </div>

      <div id="startScreen" ref={startScreenRef} className="show">
        <div id="startContent">
          <div className="title-group">
            <h1>STARWARZ</h1>
            <div className="tag">SURVIVE THE INFINITE</div>
          </div>
          <button id="startBtn" ref={startBtnRef} className="val-btn">
            <span className="btn-bg"></span>
            <span className="btn-text">PLAY</span>
          </button>
        </div>
      </div>

      <div id="pauseScreen" ref={pauseScreenRef}>
        <div id="pauseCard">
          <h2>PAUSED</h2>
          <div className="stats-row">
            <div className="stat">SCORE <span id="pauseScore" ref={pauseScoreElRef}>0</span></div>
            <div className="stat">HIGH <span id="pauseHigh" ref={pauseHighElRef}>0</span></div>
          </div>
          <div className="pause-actions">
            <button id="resumeBtn" ref={resumeBtnRef} className="val-menu-btn">RESUME</button>
            <button id="restartBtnPause" ref={restartBtnPauseRef} className="val-menu-btn">RESTART</button>
            <button id="returnBtn" ref={returnBtnRef} className="val-menu-btn">QUIT TO MENU</button>
          </div>
          <div className="esc-hint">PRESS F TO FULLSCREEN</div>
        </div>
      </div>
    </div>
  );
}
