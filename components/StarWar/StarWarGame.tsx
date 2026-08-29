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
  const hudPowerRef = useRef<HTMLSpanElement>(null);
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
  const returnBtnRef = useRef<HTMLButtonElement>(null);
  const pauseScoreElRef = useRef<HTMLSpanElement>(null);
  const pauseHighElRef = useRef<HTMLSpanElement>(null);
  const inGameHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure all refs are attached
    if (
      !containerRef.current || !canvasRef.current || !sensElRef.current ||
      !sensValRef.current || !hudScoreRef.current || !hudLivesRef.current ||
      !hudPowerRef.current || !healthBarRef.current || !healthTextRef.current ||
      !autoToggleBtnRef.current || !gameOverScreenRef.current || !finalScoreElRef.current ||
      !highScoreElRef.current || !finalKillsElRef.current || !finalTimeElRef.current ||
      !restartBtnRef.current || !startScreenRef.current || !startBtnRef.current ||
      !pauseScreenRef.current || !resumeBtnRef.current || !restartBtnPauseRef.current ||
      !pauseScoreElRef.current || !pauseHighElRef.current || !returnBtnRef.current ||
      !inGameHintRef.current
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
      hudPower: hudPowerRef.current,
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
      inGameHint: inGameHintRef.current,
    };

    const cleanup = initStarWarGame(refs);
    return cleanup;
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className="game-wrap">
        <canvas id="game" ref={canvasRef} aria-label="Star Defender game"></canvas>
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
          <button id="autoToggle" ref={autoToggleBtnRef} className="off" title="Toggle auto-shoot towards aim">
            AUTO SHOOT OFF
          </button>
          <span className="stat" id="hudPower" ref={hudPowerRef}></span>
        </div>
        <p className="hint">Move: <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> / Arrows · Aim: <kbd>Mouse</kbd> · Fire: <kbd>Click</kbd> / <kbd>Space</kbd> · Fullscreen: <kbd>F</kbd> · Restart: <kbd>R</kbd></p>
        <div id="inGameHint" ref={inGameHintRef} className="ingame-fs-hint">PRESS [F] TO FULLSCREEN</div>
      </div>

      <div id="gameOverScreen" ref={gameOverScreenRef}>
        <div className="bg-text-massive">DEFEAT</div>
        <div id="scoreCard">
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-label">FINAL SCORE</div>
              <div className="stat-value" id="finalScore" ref={finalScoreElRef}>0</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">HIGH SCORE</div>
              <div className="stat-value" id="highScore" ref={highScoreElRef}>0</div>
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
          <div className="action-row">
            <button id="restartBtn" ref={restartBtnRef} className="val-btn wide">
              <span className="btn-bg"></span>
              <span className="btn-text">PLAY AGAIN</span>
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
          <div className="esc-hint">PRESS ESC TO RESUME</div>
        </div>
      </div>
    </div>
  );
}
