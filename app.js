/* ==========================================================
   PONG PWA
   File : app.js
   Part : 5A
   Inisialisasi Game
   ========================================================== */

"use strict";

/* ==========================
   Canvas
========================== */

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

/* ==========================
   Popup
========================== */

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupMessage = document.getElementById("popupMessage");
const playAgainBtn = document.getElementById("playAgainBtn");
const menuFromPopupBtn = document.getElementById("menuFromPopupBtn");

/* ==========================
   Screens (Menu / Game)
========================== */

const menuScreen = document.getElementById("menuScreen");
const gameScreen = document.getElementById("gameScreen");
const topbar = document.getElementById("topbar");
const activeLevelBadge = document.getElementById("activeLevelBadge");

/* ==========================
   Buttons
========================== */

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const menuBtn = document.getElementById("menuBtn");

/* ==========================
   Difficulty Buttons
========================== */

const difficultyButtons =
    document.querySelectorAll(".diff-btn");

let currentDifficulty = "medium";

/* ==========================
   Score
========================== */

const playerScoreText = document.getElementById("playerScore");
const aiScoreText = document.getElementById("aiScore");

/* ==========================
   Canvas Size
========================== */

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

/* ==========================
   Paddle
========================== */

const paddle = {

    width:14,

    height:110,

    speed:7

};

/* ==========================
   Player
========================== */

const player = {

    x:25,

    y:(HEIGHT - paddle.height) / 2,

    width:paddle.width,

    height:paddle.height,

    speed:paddle.speed,

    score:0,

    up:false,

    down:false

};

/* ==========================
   AI
========================== */

const ai = {

    x:WIDTH - 25 - paddle.width,

    y:(HEIGHT - paddle.height) / 2,

    width:paddle.width,

    height:paddle.height,

    speed:5.4,

    score:0

};

/* ==========================
   Ball
========================== */

const ball = {

    x:WIDTH / 2,

    y:HEIGHT / 2,

    radius:10,

    speed:6,

    maxSpeed:14,

    dx:6,

    dy:3

};

/* ==========================
   Rules
========================== */

const GAME_RULE = {

    WIN_SCORE:7

};

/* ==========================
   State
========================== */

let gameStarted = false;

let gameOver = false;

let animationId = null;

/* ==========================
   Touch
========================== */

let touchY = null;

/* ==========================
   Helper
========================== */

function randomDirection(){

    return Math.random() > 0.5 ? 1 : -1;

}

function updateScore(){

    playerScoreText.textContent = player.score;

    aiScoreText.textContent = ai.score;

}

function resetBall(){

    ball.x = WIDTH / 2;

    ball.y = HEIGHT / 2;

    ball.speed = 6;

    ball.dx = ball.speed * randomDirection();

    ball.dy = (Math.random() * 4 - 2);

}

function resetMatch(){

    player.score = 0;

    ai.score = 0;

    updateScore();

    player.y = (HEIGHT - player.height) / 2;

    ai.y = (HEIGHT - ai.height) / 2;

    gameOver = false;

    popup.classList.add("hidden");

    resetBall();

}

/* ==========================
   Screen Switching
========================== */

function showMenuScreen(){

    gameStarted = false;

    popup.classList.add("hidden");

    menuScreen.classList.remove("hidden");

    gameScreen.classList.add("hidden");

    topbar.classList.add("hidden");

}

function showGameScreen(){

    menuScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");

    topbar.classList.remove("hidden");

}

/* ===== END PART 5A ===== */

/* ==========================================================
   Part : 5B
   Rendering (Arena, Paddle, Ball, Center Line)
   Tempelkan tepat di bawah Part 5A
   ========================================================== */

/* ==========================
   Draw Helper
========================== */

function drawRect(x, y, w, h, color){

    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);

}

function drawCircle(x, y, r, color){

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();

}

function drawText(text, x, y, size, color){

    ctx.fillStyle = color;
    ctx.font = "bold " + size + "px Arial";
    ctx.textAlign = "center";
    ctx.fillText(text, x, y);

}

/* ==========================
   Background
========================== */

function drawBackground(){

    ctx.fillStyle = "#050505";
    ctx.fillRect(0,0,WIDTH,HEIGHT);

}

/* ==========================
   Center Line
========================== */

function drawCenterLine(){

    const segment = 18;
    const gap = 14;

    ctx.fillStyle = "#333";

    for(let y=0;y<HEIGHT;y+=segment+gap){

        ctx.fillRect(
            (WIDTH/2)-2,
            y,
            4,
            segment
        );

    }

}

/* ==========================
   Arena Border
========================== */

function drawBorder(){

    ctx.strokeStyle = "#222";
    ctx.lineWidth = 4;

    ctx.strokeRect(
        2,
        2,
        WIDTH-4,
        HEIGHT-4
    );

}

/* ==========================
   Paddle Shadow
========================== */

function drawPaddleShadow(obj){

    ctx.shadowBlur = 20;
    ctx.shadowColor = "#00b7ff";

    drawRect(
        obj.x,
        obj.y,
        obj.width,
        obj.height,
        "#ffffff"
    );

    ctx.shadowBlur = 0;

}

/* ==========================
   AI Paddle
========================== */

function drawAiPaddle(){

    ctx.shadowBlur = 20;
    ctx.shadowColor = "#ff4444";

    drawRect(
        ai.x,
        ai.y,
        ai.width,
        ai.height,
        "#ffffff"
    );

    ctx.shadowBlur = 0;

}

/* ==========================
   Ball
========================== */

function drawBall(){

    ctx.shadowBlur = 18;
    ctx.shadowColor = "#ffffff";

    drawCircle(
        ball.x,
        ball.y,
        ball.radius,
        "#ffffff"
    );

    ctx.shadowBlur = 0;

}

/* ==========================
   Canvas Score
========================== */

function drawCanvasScore(){

    drawText(
        player.score,
        WIDTH*0.25,
        50,
        28,
        "#33b5ff"
    );

    drawText(
        ai.score,
        WIDTH*0.75,
        50,
        28,
        "#ff5555"
    );

}

/* ==========================
   Main Render
========================== */

function render(){

    drawBackground();

    drawBorder();

    drawCenterLine();

    drawPaddleShadow(player);

    drawAiPaddle();

    drawBall();

    drawCanvasScore();

}

/* ===== END PART 5B ===== */

/* ==========================================================
   Part : 5C
   Input Player (Keyboard, Mouse, Touch)
   Tempelkan tepat di bawah Part 5B
   ========================================================== */

/* ==========================
   Clamp Paddle
========================== */

function clampPlayer(){

    if(player.y < 0){

        player.y = 0;

    }

    if(player.y + player.height > HEIGHT){

        player.y = HEIGHT - player.height;

    }

}

/* ==========================
   Keyboard Movement
========================== */

function updatePlayer(){

    if(player.up){

        player.y -= player.speed;

    }

    if(player.down){

        player.y += player.speed;

    }

    clampPlayer();

}

/* ==========================
   Keyboard
========================== */

window.addEventListener("keydown",(e)=>{

    switch(e.key){

        case "ArrowUp":

        case "w":

        case "W":

            player.up = true;

            break;

        case "ArrowDown":

        case "s":

        case "S":

            player.down = true;

            break;

    }

});

window.addEventListener("keyup",(e)=>{

    switch(e.key){

        case "ArrowUp":

        case "w":

        case "W":

            player.up = false;

            break;

        case "ArrowDown":

        case "s":

        case "S":

            player.down = false;

            break;

    }

});

/* ==========================
   Mouse Control
========================== */

canvas.addEventListener("mousemove",(e)=>{

    const rect = canvas.getBoundingClientRect();

    const scaleY = HEIGHT / rect.height;

    player.y =
        (e.clientY - rect.top) * scaleY
        - (player.height / 2);

    clampPlayer();

});

/* ==========================
   Touch Control
========================== */

canvas.addEventListener("touchstart",(e)=>{

    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

    const scaleY = HEIGHT / rect.height;

    touchY =
        (e.touches[0].clientY - rect.top)
        * scaleY;

    /* Bug fix: langsung gerakkan paddle saat jari
       pertama kali menyentuh layar, bukan menunggu
       gerakan (touchmove) berikutnya */
    player.y = touchY - (player.height / 2);

    clampPlayer();

},{
    passive:false
});

canvas.addEventListener("touchmove",(e)=>{

    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

    const scaleY = HEIGHT / rect.height;

    touchY =
        (e.touches[0].clientY - rect.top)
        * scaleY;

    player.y = touchY - (player.height / 2);

    clampPlayer();

},{
    passive:false
});

canvas.addEventListener("touchend",()=>{

    touchY = null;

});

/* ==========================
   Start Button (dari Menu)
========================== */

startBtn.addEventListener("click",()=>{

    showGameScreen();

    resetMatch();

    gameStarted = true;

});

/* ==========================
   Restart Button (dalam game)
========================== */

restartBtn.addEventListener("click",()=>{

    resetMatch();

    gameStarted = true;

});

/* ==========================
   Menu Button (dalam game)
========================== */

menuBtn.addEventListener("click",()=>{

    showMenuScreen();

});

/* ==========================
   Play Again Button (popup)
========================== */

playAgainBtn.addEventListener("click",()=>{

    popup.classList.add("hidden");

    resetMatch();

    gameStarted = true;

});

/* ==========================
   Menu Button (popup)
========================== */

menuFromPopupBtn.addEventListener("click",()=>{

    showMenuScreen();

});

/* ==========================
   Difficulty Buttons
========================== */

difficultyButtons.forEach((btn)=>{

    btn.addEventListener("click",()=>{

        const level = btn.dataset.level;

        currentDifficulty = level;

        setDifficulty(level);

        difficultyButtons.forEach((b)=>{

            b.classList.remove("active");

        });

        btn.classList.add("active");

        const label =
            level.charAt(0).toUpperCase() + level.slice(1);

        activeLevelBadge.textContent = "Level: " + label;

    });

});

/* ===== END PART 5C ===== */

/* ==========================================================
   Part : 5D
   AI (Player vs AI)
   Tempelkan tepat di bawah Part 5C
   ========================================================== */

/* ==========================
   AI Settings
========================== */

const AI = {

    difficulty: 0.82,

    deadZone: 12,

    reaction: 0.16,

    error: 10,

    maxSpeed: ai.speed

};

/* ==========================
   Random Error
========================== */

function aiOffset(){

    return (Math.random() - 0.5) * AI.error;

}

/* ==========================
   Predict Ball Position
========================== */

function predictBallY(){

    let target = ball.y;

    if(ball.dx > 0){

        target += ball.dy * 12;

    }

    target += aiOffset();

    return target;

}

/* ==========================
   AI Movement
========================== */

function updateAI(){

    const targetY =
        predictBallY()
        - (ai.height / 2);

    const center =
        ai.y + (ai.height / 2);

    const distance =
        targetY - center;

    if(Math.abs(distance) <= AI.deadZone){

        return;

    }

    const velocity = Math.min(

        AI.maxSpeed,

        Math.abs(distance) * AI.reaction

    );

    if(distance > 0){

        ai.y += velocity;

    }else{

        ai.y -= velocity;

    }

    if(ai.y < 0){

        ai.y = 0;

    }

    if(ai.y + ai.height > HEIGHT){

        ai.y = HEIGHT - ai.height;

    }

}

/* ==========================
   Difficulty
========================== */

function setDifficulty(level){

    switch(level){

        case "easy":

            AI.reaction = 0.10;
            AI.error = 26;
            AI.maxSpeed = 4.2;

        break;

        case "medium":

            AI.reaction = 0.16;
            AI.error = 10;
            AI.maxSpeed = 5.4;

        break;

        case "hard":

            AI.reaction = 0.22;
            AI.error = 5;
            AI.maxSpeed = 6.6;

        break;

    }

}

/* Default Difficulty */

setDifficulty("medium");

/* ===== END PART 5D ===== */

/* ==========================================================
   Part : 5E
   Fisika, Collision, Pantulan Bola, Batas Arena
   Tempelkan tepat di bawah Part 5D
   ========================================================== */

/* ==========================
   Pantulan Dinding Atas/Bawah
========================== */

function bounceWalls(){

    if(ball.y - ball.radius <= 0){

        ball.y = ball.radius;
        ball.dy = Math.abs(ball.dy);

    }

    if(ball.y + ball.radius >= HEIGHT){

        ball.y = HEIGHT - ball.radius;
        ball.dy = -Math.abs(ball.dy);

    }

}

/* ==========================
   Pantulan Dari Paddle
========================== */

function reflectFromPaddle(padObj, isPlayerSide){

    /* Titik tumbukan relatif terhadap tengah paddle,
       nilai antara -1 (ujung atas) sampai 1 (ujung bawah) */

    const relativeIntersect =
        (ball.y - (padObj.y + padObj.height / 2)) /
        (padObj.height / 2);

    const clampedIntersect =
        Math.max(-1, Math.min(1, relativeIntersect));

    const maxBounceAngle = Math.PI / 3; // 60 derajat

    const bounceAngle = clampedIntersect * maxBounceAngle;

    const direction = isPlayerSide ? 1 : -1;

    /* Bola sedikit dipercepat setiap kali kena paddle,
       tapi tidak pernah melebihi maxSpeed */

    ball.speed = Math.min(ball.speed + 0.45, ball.maxSpeed);

    ball.dx = direction * ball.speed * Math.cos(bounceAngle);
    ball.dy = ball.speed * Math.sin(bounceAngle);

}

/* ==========================
   Collision Player Paddle
========================== */

function checkPlayerCollision(){

    if(ball.dx >= 0){

        return;

    }

    const paddleRight = player.x + player.width;

    const willCross =
        (ball.x - ball.radius) <= paddleRight &&
        (ball.x - ball.radius) >= player.x;

    const withinHeight =
        ball.y + ball.radius >= player.y &&
        ball.y - ball.radius <= player.y + player.height;

    if(willCross && withinHeight){

        ball.x = paddleRight + ball.radius;

        reflectFromPaddle(player, true);

    }

}

/* ==========================
   Collision AI Paddle
========================== */

function checkAiCollision(){

    if(ball.dx <= 0){

        return;

    }

    const withinHeight =
        ball.y + ball.radius >= ai.y &&
        ball.y - ball.radius <= ai.y + ai.height;

    const willCross =
        (ball.x + ball.radius) >= ai.x &&
        (ball.x + ball.radius) <= ai.x + ai.width;

    if(willCross && withinHeight){

        ball.x = ai.x - ball.radius;

        reflectFromPaddle(ai, false);

    }

}

/* ==========================
   Update Posisi Bola
========================== */

function updateBall(){

    ball.x += ball.dx;
    ball.y += ball.dy;

    bounceWalls();

    checkPlayerCollision();
    checkAiCollision();

}

/* ===== END PART 5E ===== */

/* ==========================================================
   Part : 5F
   Sistem Skor, Menang/Kalah, Popup
   Tempelkan tepat di bawah Part 5E
   ========================================================== */

/* ==========================
   Tampilkan Popup Akhir
========================== */

function showResultPopup(isPlayerWin){

    if(isPlayerWin){

        popupTitle.textContent = "You Win!";
        popupMessage.textContent =
            "Selamat! Kamu berhasil mengalahkan AI dengan skor "
            + player.score + " - " + ai.score + ".";

    }else{

        popupTitle.textContent = "You Lose";
        popupMessage.textContent =
            "AI menang dengan skor "
            + ai.score + " - " + player.score
            + ". Coba lagi!";

    }

    popup.classList.remove("hidden");

}

/* ==========================
   Akhiri Pertandingan
========================== */

function endMatch(isPlayerWin){

    gameOver = true;
    gameStarted = false;

    showResultPopup(isPlayerWin);

}

/* ==========================
   Cek Bola Keluar Arena (Skor)
========================== */

function checkScore(){

    /* Bola keluar dari sisi kiri -> AI dapat poin */

    if(ball.x + ball.radius < 0){

        ai.score += 1;

        updateScore();

        if(ai.score >= GAME_RULE.WIN_SCORE){

            endMatch(false);

        }else{

            resetBall();

        }

        return;

    }

    /* Bola keluar dari sisi kanan -> Player dapat poin */

    if(ball.x - ball.radius > WIDTH){

        player.score += 1;

        updateScore();

        if(player.score >= GAME_RULE.WIN_SCORE){

            endMatch(true);

        }else{

            resetBall();

        }

        return;

    }

}

/* ===== END PART 5F ===== */

/* ==========================================================
   Part : 5G
   Game Loop, Start, Restart, Reset
   Tempelkan tepat di bawah Part 5F
   ========================================================== */

/* ==========================
   Update Seluruh State Game
========================== */

function update(){

    if(!gameStarted || gameOver){

        return;

    }

    updatePlayer();
    updateAI();
    updateBall();
    checkScore();

}

/* ==========================
   Loop Utama (requestAnimationFrame)
========================== */

function gameLoop(){

    update();
    render();

    animationId = requestAnimationFrame(gameLoop);

}

/* Loop selalu berjalan agar arena tetap ter-render
   (idle state) walau game belum dimulai / sedang
   menunggu di popup. Update hanya jalan saat
   gameStarted true dan gameOver false. */

gameLoop();

/* ===== END PART 5G ===== */

/* ==========================================================
   Part : 5H
   Event Listener Tambahan, Optimasi, Penutup File
   Tempelkan tepat di bawah Part 5G
   ========================================================== */

/* ==========================
   Pause Otomatis Saat Tab
   Tidak Aktif (Hemat Baterai HP)
========================== */

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        if(animationId !== null){

            cancelAnimationFrame(animationId);
            animationId = null;

        }

    }else{

        if(animationId === null){

            gameLoop();

        }

    }

});

/* ==========================
   Cegah Scroll Halaman Saat
   Bermain Di Layar Sentuh
========================== */

document.addEventListener("touchmove",(e)=>{

    if(e.target === canvas){

        e.preventDefault();

    }

},{
    passive:false
});

/* ==========================
   Render Ulang Saat Resize /
   Ganti Orientasi Layar (HP/Tablet)
========================== */

window.addEventListener("resize",()=>{

    render();

});

window.addEventListener("orientationchange",()=>{

    render();

});

/* ==========================
   Cegah Klik Kanan / Context
   Menu Mengganggu Canvas
========================== */

canvas.addEventListener("contextmenu",(e)=>{

    e.preventDefault();

});

/* ===== END PART 5H ===== */

/* ==========================================================
   Part : 5I (Update)
   Notifikasi & Prompt Install PWA
   Tempelkan tepat di bawah Part 5H
   ========================================================== */

/* ==========================
   Elemen Install
========================== */

const installBanner = document.getElementById("installBanner");
const installBtn = document.getElementById("installBtn");
const installDismissBtn = document.getElementById("installDismissBtn");
const installToast = document.getElementById("installToast");

let deferredInstallPrompt = null;

const INSTALL_DISMISS_KEY = "pong_install_dismissed";

/* ==========================
   Cek Status Terpasang (Standalone)
========================== */

function isRunningStandalone(){

    const isStandaloneDisplay =
        window.matchMedia &&
        window.matchMedia("(display-mode: standalone)").matches;

    const isIosStandalone =
        window.navigator.standalone === true;

    return isStandaloneDisplay || isIosStandalone;

}

/* ==========================
   Tampilkan Notifikasi Install
========================== */

function showInstallBanner(){

    if(isRunningStandalone()){

        return;

    }

    let alreadyDismissed = false;

    try{

        alreadyDismissed =
            localStorage.getItem(INSTALL_DISMISS_KEY) === "1";

    }catch(err){

        alreadyDismissed = false;

    }

    if(alreadyDismissed){

        return;

    }

    installBanner.classList.remove("hidden");

}

function hideInstallBanner(){

    installBanner.classList.add("hidden");

}

/* ==========================
   Tangkap Event beforeinstallprompt
   (Chrome/Edge/Android)
========================== */

window.addEventListener("beforeinstallprompt",(e)=>{

    e.preventDefault();

    deferredInstallPrompt = e;

    showInstallBanner();

});

/* ==========================
   Tombol Install Diklik
========================== */

installBtn.addEventListener("click",async()=>{

    hideInstallBanner();

    if(!deferredInstallPrompt){

        return;

    }

    deferredInstallPrompt.prompt();

    const choice = await deferredInstallPrompt.userChoice;

    deferredInstallPrompt = null;

    if(choice && choice.outcome !== "accepted"){

        try{

            localStorage.setItem(INSTALL_DISMISS_KEY,"1");

        }catch(err){}

    }

});

/* ==========================
   Tombol Tutup Notifikasi
========================== */

installDismissBtn.addEventListener("click",()=>{

    hideInstallBanner();

    try{

        localStorage.setItem(INSTALL_DISMISS_KEY,"1");

    }catch(err){}

});

/* ==========================
   Notifikasi Sukses Terpasang
========================== */

window.addEventListener("appinstalled",()=>{

    hideInstallBanner();

    deferredInstallPrompt = null;

    try{

        localStorage.removeItem(INSTALL_DISMISS_KEY);

    }catch(err){}

    installToast.classList.remove("hidden");

    setTimeout(()=>{

        installToast.classList.add("hidden");

    },3500);

});

/* ==========================
   Fallback iOS Safari
   (tidak ada beforeinstallprompt)
========================== */

function isIosSafari(){

    const ua = window.navigator.userAgent;

    const isIos = /iphone|ipad|ipod/i.test(ua);

    const isSafari =
        /safari/i.test(ua) && !/crios|fxios|opios/i.test(ua);

    return isIos && isSafari;

}

if(isIosSafari() && !isRunningStandalone()){

    let alreadyDismissed = false;

    try{

        alreadyDismissed =
            localStorage.getItem(INSTALL_DISMISS_KEY) === "1";

    }catch(err){}

    if(!alreadyDismissed){

        installBanner.classList.remove("hidden");

        const iosText =
            installBanner.querySelector(".install-text span");

        if(iosText){

            iosText.textContent =
                "Tap tombol Share di Safari, lalu pilih \"Add to Home Screen\" untuk memasang aplikasi ini.";

        }

        installBtn.style.display = "none";

    }

}

/* ===== END PART 5I ===== */

/* ==========================================================
   PENUTUP FILE
   Semua bagian (5A - 5I) telah lengkap:
   - 5A: Inisialisasi, objek game, screen switching
   - 5B: Render arena, paddle, bola, skor
   - 5C: Input keyboard, mouse, sentuh, navigasi menu
   - 5D: AI lawan (easy / medium / hard)
   - 5E: Fisika & collision
   - 5F: Sistem skor & popup menang/kalah
   - 5G: Game loop utama
   - 5H: Optimasi & event listener tambahan
   - 5I: Notifikasi & prompt install PWA
   ========================================================== */

