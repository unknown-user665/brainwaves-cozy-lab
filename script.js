let fusActive = false;
let graphTimer = null;
let currentTab = 'popular';

function setTheme(themeName, element) {
    document.body.className = document.body.className.replace(/theme-\w+/g, 'theme-' + themeName);
    document.querySelectorAll('.color-dot').forEach(dot => dot.classList.remove('active'));
    element.classList.add('active');
}

function setPattern(patternName, element) {
    document.body.className = document.body.className.replace(/pattern-\w+/g, 'pattern-' + patternName);
    document.querySelectorAll('.pattern-btn').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
}

function drawGraph(type) {
    const path = document.getElementById('pulse-wave');
    if(!path) return;
    let points = [];
    let width = 400;
    
    if (type === 'normal') {
        for (let x = 0; x <= width; x += 5) {
            let y = 90 + Math.sin(x * 0.1) * 3 + (Math.random() * 2);
            points.push(`${x} ${y}`);
        }
    } else if (type === 'touch') {
        for (let x = 0; x <= width; x += 5) {
            let spike = 0;
            if (x > 150 && x < 210) {
                spike = Math.sin((x - 150) * 0.1) * 45;
            }
            let y = 90 - spike + (Math.random() * 4);
            points.push(`${x} ${y}`);
        }
    } else if (type === 'fus') {
        for (let x = 0; x <= width; x += 4) {
            let buzz = Math.sin(x * 0.8) * 15;
            let y = 90 + buzz + (Math.random() * 5);
            points.push(`${x} ${y}`);
        }
    }
    
    path.setAttribute('d', 'M ' + points.join(' L '));
}

function toggleFUS() {
    fusActive = !fusActive;
    const btn = document.getElementById('fus-btn');
    const info = document.getElementById('info-box');
    
    if (fusActive) {
        btn.innerText = "🛑 Stop Acoustic Pulse";
        btn.style.background = "var(--secondary)";
        info.innerText = "🚀 Ultrasound waves are vibrating deep neural fields! Notice the hyper-frequent background noise changes on the monitor.";
        clearInterval(graphTimer);
        graphTimer = setInterval(() => drawGraph('fus'), 80);
    } else {
        btn.innerText = "⚡ Target VPL Thalamus";
        btn.style.background = "var(--panel-bg)";
        info.innerText = "The baseline returns back to regular rest states. Ready for a new mechanical sensory event loop.";
        initNormalGraph();
    }
}

function triggerTouch() {
    if (fusActive) {
        document.getElementById('info-box').innerText = "⚠️ Blocked! The active focused ultrasound beam safely disrupts the thalamic relay network, making the touch spike hard to transfer.";
        return;
    }
    document.getElementById('info-box').innerText = "💥 Sensory transmission success! The skin touch travels straight up the spine to trigger an intracranial reaction spike.";
    clearInterval(graphTimer);
    let frame = 0;
    graphTimer = setInterval(() => {
        drawGraph('touch');
        frame++;
        if (frame > 12) {
            initNormalGraph();
        }
    }, 70);
}

function initNormalGraph() {
    clearInterval(graphTimer);
    graphTimer = setInterval(() => drawGraph('normal'), 100);
}

function switchTab(tabName) {
    currentTab = tabName;
    document.getElementById('tab-popular').classList.toggle('active', tabName === 'popular');
    document.getElementById('tab-recent').classList.toggle('active', tabName === 'recent');
    document.getElementById('popular-content').style.display = tabName === 'popular' ? 'block' : 'none';
    document.getElementById('recent-content').style.display = tabName === 'recent' ? 'block' : 'none';
}

function loadRandomArticle() {
    const allArticles = ['art-1', 'art-2', 'art-3'];
    const randomId = allArticles[Math.floor(Math.random() * allArticles.length)];
    
    if (randomId === 'art-3') {
        switchTab('recent');
    } else {
        switchTab('popular');
    }

    document.querySelectorAll('.article-card').forEach(card => card.classList.remove('active'));
    document.getElementById(randomId).classList.add('active');
    
    triggerRandomizer();
}

function triggerRandomizer() {
    const themes = ['bubblegum', 'matcha', 'sky'];
    const patterns = ['grid', 'sparkles', 'clouds'];
    
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
    
    document.body.className = `theme-${randomTheme} pattern-${randomPattern}`;
    
    document.querySelectorAll('.pattern-btn').forEach(btn => {
        btn.classList.toggle('active', btn.innerText.toLowerCase() === randomPattern);
    });
    
    clearInterval(graphTimer);
    drawGraph(Math.random() > 0.5 ? 'fus' : 'touch');
    setTimeout(initNormalGraph, 800);
}

// Start graph on load
initNormalGraph();

