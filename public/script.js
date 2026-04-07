let model, maxPredictions;

const video = document.getElementById('video');
const canvas = document.getElementById('snapshot');
const loader = document.getElementById('loader');
const startCameraBtn = document.getElementById('start-camera-btn');
const scanBtn = document.getElementById('scan-btn');

function toggleLoader(toggle) {
    loader.style.display = toggle ? 'flex' : 'none';
}

// Load model
async function init() {
    startCameraBtn.disabled = true;
    scanBtn.disabled = true;

    const modelURL = './assets/model/model.json';
    const metadataURL = './assets/model/metadata.json';

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    startCameraBtn.disabled = false;
}

// Start camera
startCameraBtn.onclick = async () => {
    toggleLoader(true);
    startCameraBtn.disabled = true;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Browser Anda tidak mendukung kamera. Gunakan Chrome, Edge, atau Safari terbaru dengan HTTPS.");
        toggleLoader(false);
        startCameraBtn.disabled = false;
        return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    video.srcObject = stream;

    video.style.display = 'block';
    canvas.style.display = 'none';

    scanBtn.disabled = false;
}

// Scan snapshot
scanBtn.onclick = async () => {
    toggleLoader(true);
    scanBtn.disabled = true;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const prediction = await model.predict(canvas);
    const sorted = prediction.sort((a, b) => b.probability - a.probability);
    const top = sorted[0];

    alert(`🚮 Sampah terdeteksi: ${top.className}\n💯 Confidence: ${(top.probability*100).toFixed(1)}%`);

    scanBtn.disabled = false;
    toggleLoader(false);
}

init();