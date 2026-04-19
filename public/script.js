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

    const wasteModelURL = './assets/model-waste/model.json';
    const wasteMetadataURL = './assets/model-waste/metadata.json';

    const recycleModelURL = './assets/model-recycle/model.json';
    const recycleMetadataURL = './assets/model-recycle/metadata.json';

    wasteModel = await tmImage.load(wasteModelURL, wasteMetadataURL);
    recycleModel = await tmImage.load(recycleModelURL, recycleMetadataURL);

    maxPredictions = wasteModel.getTotalClasses();

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

    // Predict jenis sampah
    const wastePrediction = await wasteModel.predict(canvas);
    const wasteTop = wastePrediction.sort((a, b) => b.probability - a.probability)[0];

    // Predict recyclable
    const recyclePrediction = await recycleModel.predict(canvas);
    const recycleTop = recyclePrediction.sort((a, b) => b.probability - a.probability)[0];

    alert(
        `🚮 Jenis: ${wasteTop.className}\n` +
        `♻️ Recyclable: ${recycleTop.className}\n`
    );

    scanBtn.disabled = false;
    toggleLoader(false);
}

init();