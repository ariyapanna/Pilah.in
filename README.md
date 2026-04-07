# Pilah.in ♻️

**Pilah.in** adalah aplikasi web sederhana untuk **mengklasifikasikan sampah** menggunakan kamera perangkat.  
Aplikasi ini memanfaatkan **TensorFlow.js** dan **Teachable Machine** untuk mendeteksi jenis sampah secara cepat dari snapshot kamera.

---

## 🔹 Fitur

- Kamera langsung di web, dengan snapshot untuk prediksi.
- Klasifikasi sampah berbasis model Teachable Machine.
- Desain **simple, modern, dan responsive** dengan Bootstrap.
- Loading animasi shimmer saat model atau kamera belum siap.
- Bisa dijalankan di desktop maupun mobile (HTTPS diperlukan untuk akses kamera di handphone).

---

## 🛠️ Teknologi

- HTML, CSS, JavaScript
- [Bootstrap 5](https://getbootstrap.com/)
- [TensorFlow.js](https://www.tensorflow.org/js)
- [Teachable Machine](https://teachablemachine.withgoogle.com/)
- Node.js + Express untuk serving web
- Optional: Docker untuk deployment

---

## 💻 Cara Menjalankan (Development)

1. Clone repository:

```bash
git clone https://github.com/username/pilah.in.git
cd pilah.in
```

2. Install depedencies:
```bash 
npm install
```

3. Jalankan server:
```bash
npm start
```

4. Buka browser: http://localhost:3000
> ⚠️ Untuk mengakses kamera di mobile, pastikan menggunakan HTTPS atau deploy ke server.

===

## 📦 Deployment dengan Docker

1. Build image:
```bash
docker build -t pilahin-app .
```

2. Jalankan container:
```bash
docker run -d -p 3000:3000 --env PORT=3000 pilahin-app
```

3. Buka browser: `http://localhost:3000`
> Ganti PORT sesuai kebutuhan.

---

## 📝 Struktur Project

```
pilah.in/
├── public/
│   ├── index.html
│   ├── script.js
│   ├── assets/
│   │   ├── model/           # model Teachable Machine (.json, .bin)
│   │   └── images/          # logo & placeholder
├── .dockerignore
├── Dockerfile
├── package.json
├── package-lock.json
└── README.md
```

---

## 📜 License
MIT License