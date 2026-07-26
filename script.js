// =========================================
// TYPEWRITER EFFECT
// =========================================

const text = "Will You Be My Valentine? ❤️";
const typewriter = document.getElementById("typewriter");

let index = 0;

function typeEffect() {
    if (index < text.length) {
        typewriter.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 90);
    }
}

typeEffect();


// =========================================
// FLOATING HEARTS
// =========================================

const hearts = document.querySelector(".hearts");

function createHeart() {
    const heart = document.createElement("span");
    heart.innerHTML = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 25 + 15 + "px";
    heart.style.animationDuration = Math.random() * 5 + 5 + "s";
    hearts.appendChild(heart);

    setTimeout(() => { heart.remove(); }, 10000);
}

setInterval(createHeart, 300);


// =========================================
// SAKURA PETALS
// =========================================

const petals = document.querySelector(".petals");

function createPetal() {
    const petal = document.createElement("span");
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = Math.random() * 6 + 5 + "s";
    petal.style.opacity = Math.random();
    petals.appendChild(petal);

    setTimeout(() => { petal.remove(); }, 12000);
}

setInterval(createPetal, 500);


// =========================================
// DARK MODE
// =========================================

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
});


// =========================================
// MUSIC
// (bound to both click and touchstart so mobile taps trigger it too)
// =========================================

const music = document.getElementById("music");

function startMusic() {
    music.play().catch(() => { /* no audio source provided yet */ });
}

document.body.addEventListener("click", startMusic, { once: true });
document.body.addEventListener("touchstart", startMusic, { once: true });


// =========================================
// BUTTONS
// =========================================

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

let yesScale = 1;
const MAX_YES_SCALE = 2.6; // cap so the button can't grow forever

// =========================================
// NO BUTTON ESCAPE
// =========================================

function moveNoButton() {
    const padding = 20;

    const maxX = Math.max(window.innerWidth - noBtn.offsetWidth - padding, padding);
    const maxY = Math.max(window.innerHeight - noBtn.offsetHeight - padding, padding);

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.position = "fixed";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveNoButton();
});

// =========================================
// YES BUTTON GROWS
// (mouseenter instead of mouseover so it fires once per entry, plus a cap)
// =========================================

noBtn.addEventListener("mouseenter", () => {
    yesScale = Math.min(yesScale + 0.15, MAX_YES_SCALE);
    yesBtn.style.transform = `scale(${yesScale})`;
});

// =========================================
// YES CLICK
// =========================================

yesBtn.addEventListener("click", () => {
    popup.classList.add("show");

    if (typeof confetti === "function") {
        confetti({ particleCount: 250, spread: 120, origin: { y: 0.6 } });

        setTimeout(() => {
            confetti({ particleCount: 150, angle: 60, spread: 70, origin: { x: 0 } });
            confetti({ particleCount: 150, angle: 120, spread: 70, origin: { x: 1 } });
        }, 400);
    }
});

// =========================================
// CLOSE POPUP
// =========================================

closePopup.addEventListener("click", () => {
    popup.classList.remove("show");
});

// =========================================
// ESC KEY CLOSE
// =========================================

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        popup.classList.remove("show");
    }
});

// =========================================
// POPUP OUTSIDE CLICK
// =========================================

popup.addEventListener("click", (e) => {
    if (e.target === popup) {
        popup.classList.remove("show");
    }
});

// =========================================
// SPARKLE CURSOR (throttled to avoid jank)
// =========================================

let lastSpark = 0;
const SPARK_INTERVAL = 40; // ms between sparks

document.addEventListener("mousemove", (e) => {
    const now = performance.now();
    if (now - lastSpark < SPARK_INTERVAL) return;
    lastSpark = now;

    const spark = document.createElement("div");

    spark.style.position = "fixed";
    spark.style.left = e.clientX + "px";
    spark.style.top = e.clientY + "px";
    spark.style.width = "8px";
    spark.style.height = "8px";
    spark.style.borderRadius = "50%";
    spark.style.background = "#ff4d6d";
    spark.style.pointerEvents = "none";
    spark.style.zIndex = "9999";
    spark.style.transition = "all .8s linear";

    document.body.appendChild(spark);

    requestAnimationFrame(() => {
        spark.style.transform = "scale(0)";
        spark.style.opacity = "0";
    });

    setTimeout(() => { spark.remove(); }, 800);
});

// =========================================
// RANDOM LOVE MESSAGES (tab title)
// =========================================

const messages = [
    "You are my sunshine ☀️",
    "I love you ❤️",
    "You are my happiness 💖",
    "My heart is yours 💕",
    "Forever Together 💍",
    "Love You Infinity ♾️"
];

setInterval(() => {
    document.title = messages[Math.floor(Math.random() * messages.length)];
}, 2500);

// =========================================
// END
// =========================================
