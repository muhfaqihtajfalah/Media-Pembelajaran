"use strict";

/* =====================================================
   DATA MATERI  (ubah isi di sini kalau mau revisi materi)
   ===================================================== */
const LAYERS = [
  { n: 1, name: "Physical", ico: "⚡", tag: "Kirim bit",
    desc: "Layer Physical merupakan layer paling bawah pada Model OSI yang berhubungan dengan pengiriman bit melalui media fisik.",
    fungsi: ["Mengirim bit", "Mengatur karakteristik fisik komunikasi (sinyal, tegangan, kecepatan)"],
    contoh: "Sinyal listrik, sinyal cahaya, dan gelombang radio pada Wi-Fi.", unit: "Bit" },
  { n: 2, name: "Data Link", ico: "🔌", tag: "Frame & MAC",
    desc: "Layer Data Link mengatur pengiriman data antar dua perangkat yang terhubung langsung dalam bentuk frame.",
    fungsi: ["Membentuk data menjadi frame", "Memakai alamat MAC untuk mengenali perangkat", "Mendeteksi kesalahan pengiriman pada frame"],
    contoh: "Ethernet dan Wi-Fi (IEEE 802.11), alamat MAC.", unit: "Frame" },
  { n: 3, name: "Network", ico: "🗺️", tag: "IP & jalur",
    desc: "Layer Network bertugas memberi alamat logis dan menentukan jalur agar data sampai ke jaringan tujuan.",
    fungsi: ["Memberi alamat logis (alamat IP)", "Menentukan jalur pengiriman (routing)", "Meneruskan paket ke jaringan tujuan"],
    contoh: "Protokol IP dan alamat IP seperti 192.168.1.10.", unit: "Packet" },
  { n: 4, name: "Transport", ico: "📦", tag: "End-to-end",
    desc: "Layer Transport bertanggung jawab atas komunikasi end-to-end, yaitu pengiriman data antara aplikasi di sumber dan di tujuan.",
    fungsi: ["Membagi data menjadi segmen", "Mengatur komunikasi end-to-end", "Menggunakan port untuk membedakan aplikasi"],
    contoh: "TCP (andal) dan UDP (cepat).", unit: "Segment (TCP) / Datagram (UDP)" },
  { n: 5, name: "Session", ico: "🤝", tag: "Kelola sesi",
    desc: "Layer Session mengatur sesi komunikasi, yaitu kapan percakapan antar aplikasi dimulai, dijaga, dan diakhiri.",
    fungsi: ["Membuka sesi komunikasi", "Menjaga sesi tetap berjalan", "Menutup sesi saat komunikasi selesai"],
    contoh: "Sesi login pada sebuah layanan atau sesi video call.", unit: "Data" },
  { n: 6, name: "Presentation", ico: "🎨", tag: "Format & enkripsi",
    desc: "Layer Presentation memastikan data dalam format yang bisa dipahami penerima, termasuk enkripsi dan kompresi.",
    fungsi: ["Mengubah format data", "Mengenkripsi dan mendekripsi data", "Mengompresi data"],
    contoh: "Format JPEG, MP3, dan enkripsi TLS/SSL.", unit: "Data" },
  { n: 7, name: "Application", ico: "💻", tag: "Dekat pengguna",
    desc: "Layer Application adalah layer paling atas yang paling dekat dengan pengguna, tempat aplikasi memakai layanan jaringan.",
    fungsi: ["Menyediakan layanan jaringan untuk aplikasi", "Menjadi antarmuka antara pengguna dan jaringan"],
    contoh: "Browser (HTTP/HTTPS), email (SMTP), transfer file (FTP), dan DNS.", unit: "Data" }
];

const PROTO = [
  { name: "HTTP", full: "Hypertext Transfer Protocol", layer: "Application", ico: "🌐",
    arti: "Protokol untuk pertukaran data antara browser dan web server.",
    fungsi: "Mengirim permintaan halaman web dan menerima isinya.",
    contoh: "Mengakses halaman website." },
  { name: "HTTPS", full: "Hypertext Transfer Protocol Secure", layer: "Application", ico: "🔒",
    arti: "HTTP yang dilindungi enkripsi (TLS/SSL).",
    fungsi: "Mengamankan data agar tidak mudah disadap atau diubah.",
    contoh: "Login atau belanja online di website." },
  { name: "FTP", full: "File Transfer Protocol", layer: "Application", ico: "📁",
    arti: "Protokol untuk memindahkan file antara dua komputer.",
    fungsi: "Mengunggah dan mengunduh file dari server.",
    contoh: "Upload file website ke hosting." },
  { name: "SMTP", full: "Simple Mail Transfer Protocol", layer: "Application", ico: "✉️",
    arti: "Protokol untuk mengirim email.",
    fungsi: "Mengirim email dari pengirim ke server email tujuan.",
    contoh: "Mengirim email lewat aplikasi email." },
  { name: "DNS", full: "Domain Name System", layer: "Application", ico: "📖",
    arti: "Sistem yang menerjemahkan nama domain menjadi alamat IP.",
    fungsi: "Membuat kita cukup mengingat nama, bukan deretan angka.",
    contoh: "google.com diterjemahkan menjadi alamat IP-nya." },
  { name: "TCP", full: "Transmission Control Protocol", layer: "Transport", ico: "✅",
    arti: "Protokol transport yang andal dan berorientasi koneksi.",
    fungsi: "Memastikan data sampai lengkap dan berurutan.",
    contoh: "Membuka web dan mengirim email." },
  { name: "UDP", full: "User Datagram Protocol", layer: "Transport", ico: "⚡",
    arti: "Protokol transport yang cepat tanpa jaminan data sampai.",
    fungsi: "Mengirim data dengan cepat tanpa proses koneksi yang rumit.",
    contoh: "Video call, streaming, dan game online." },
  { name: "IP", full: "Internet Protocol", layer: "Network", ico: "📍",
    arti: "Protokol yang memberi alamat dan mengirim paket antar jaringan.",
    fungsi: "Memberi alamat IP dan mengarahkan paket ke tujuan.",
    contoh: "Setiap perangkat di internet punya alamat IP." }
];

/* Soal kuis: q = pertanyaan, o = pilihan A-D, a = index jawaban benar (0-3), e = pembahasan */
const QUIZ = [
  { q: "Apa kepanjangan dari OSI?", o: ["Open System Internet", "Open Systems Interconnection", "Operating System Interface", "Online Service Interconnection"], a: 1,
    e: "OSI adalah singkatan dari Open Systems Interconnection, model acuan komunikasi antar sistem." },
  { q: "Apa tujuan utama dibuatnya Model OSI?", o: ["Mempercepat koneksi internet", "Menjadi standar acuan komunikasi antar sistem", "Menggantikan semua perangkat jaringan", "Menyimpan data pengguna"], a: 1,
    e: "Model OSI dibuat sebagai standar acuan supaya sistem yang berbeda bisa berkomunikasi secara seragam." },
  { q: "Mengapa komunikasi jaringan dibagi menjadi beberapa layer?", o: ["Agar jaringan lebih mahal", "Agar tiap layer fokus pada satu tugas sehingga mudah dipelajari dan dikembangkan", "Agar data tidak bisa dikirim", "Agar hanya satu protokol yang dipakai"], a: 1,
    e: "Pembagian layer memecah tugas besar menjadi tugas kecil sehingga lebih mudah dipahami dan dicari masalahnya." },
  { q: "Layer OSI yang berhubungan dengan pengiriman bit melalui media fisik adalah...", o: ["Network", "Data Link", "Physical", "Transport"], a: 2,
    e: "Physical adalah layer paling bawah yang mengirim bit lewat media fisik." },
  { q: "Fungsi utama layer Data Link adalah...", o: ["Menentukan jalur antar jaringan", "Mengirim frame antar perangkat yang terhubung langsung dengan alamat MAC", "Mengenkripsi data", "Menyediakan layanan email"], a: 1,
    e: "Data Link membentuk frame dan memakai alamat MAC untuk komunikasi antar perangkat yang terhubung langsung." },
  { q: "Layer yang bertugas memberi alamat logis (IP) dan menentukan jalur pengiriman adalah...", o: ["Network", "Session", "Presentation", "Physical"], a: 0,
    e: "Network mengurus alamat IP dan penentuan jalur (routing) agar paket sampai ke jaringan tujuan." },
  { q: "Apa fungsi utama Transport Layer?", o: ["Mengatur sesi", "Mengatur komunikasi end-to-end", "Mengubah format gambar", "Mengirim sinyal listrik"], a: 1,
    e: "Transport Layer bertanggung jawab terhadap komunikasi end-to-end dan pengiriman data antara sumber dan tujuan." },
  { q: "Membuka, menjaga, dan menutup sesi komunikasi adalah tugas layer...", o: ["Application", "Data Link", "Transport", "Session"], a: 3,
    e: "Session mengatur kapan sebuah sesi komunikasi dimulai, dijaga, dan diakhiri." },
  { q: "Enkripsi, kompresi, dan perubahan format data ditangani oleh layer...", o: ["Presentation", "Network", "Physical", "Session"], a: 0,
    e: "Presentation memastikan data berformat yang dapat dipahami penerima, termasuk enkripsi dan kompresi." },
  { q: "Layer OSI yang paling dekat dengan pengguna adalah...", o: ["Physical", "Transport", "Presentation", "Application"], a: 3,
    e: "Application adalah layer paling atas, tempat aplikasi seperti browser dan email memakai layanan jaringan." },
  { q: "Apa perbedaan utama HTTPS dibanding HTTP?", o: ["HTTPS lebih lambat karena tanpa server", "HTTPS dilindungi enkripsi TLS/SSL", "HTTPS hanya untuk email", "HTTPS tidak memakai browser"], a: 1,
    e: "HTTPS adalah HTTP yang diamankan dengan enkripsi sehingga data tidak mudah disadap." },
  { q: "Protokol yang digunakan untuk memindahkan (upload/download) file adalah...", o: ["SMTP", "DNS", "FTP", "IP"], a: 2,
    e: "FTP (File Transfer Protocol) dipakai untuk mengunggah dan mengunduh file." },
  { q: "Protokol untuk mengirim email adalah...", o: ["SMTP", "HTTP", "UDP", "DNS"], a: 0,
    e: "SMTP (Simple Mail Transfer Protocol) bertugas mengirim email ke server email tujuan." },
  { q: "Protokol yang menerjemahkan nama domain menjadi alamat IP adalah...", o: ["TCP", "FTP", "DNS", "HTTPS"], a: 2,
    e: "DNS (Domain Name System) menerjemahkan nama domain seperti google.com menjadi alamat IP." },
  { q: "Manakah pernyataan yang benar tentang TCP dan UDP?", o: ["TCP cepat tanpa jaminan, UDP andal dan berurutan", "TCP andal dan berurutan, UDP lebih cepat tanpa jaminan", "Keduanya bekerja di layer Physical", "Keduanya dipakai khusus untuk email"], a: 1,
    e: "TCP memastikan data sampai lengkap dan berurutan, sedangkan UDP lebih cepat tetapi tanpa jaminan." }
];

/* =====================================================
   HELPER
   ===================================================== */
const $ = (s, r = document) => r.querySelector(s);
const hue = n => `hsl(${199 + (n - 1) * 3.6} 85% 40%)`;
const LETTER = ["A", "B", "C", "D"];

/* =====================================================
   NAVIGASI
   ===================================================== */
const menu = $("#menu"), burger = $("#burger");

function closeMenu() {
  menu.classList.remove("open");
  burger.setAttribute("aria-expanded", "false");
}

burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(open));
});

const TOPICS = ["materiA", "materiB", "materiC"];
function showTopic(id) {
  TOPICS.forEach(t => document.getElementById(t).classList.toggle("active", t === id));
  document.querySelectorAll(".chips button").forEach(b => b.classList.toggle("active", b.dataset.scroll === id));
}
showTopic("materiA");

function go(id, scrollId) {
  document.querySelectorAll(".page").forEach(p => p.classList.toggle("active", p.id === id));
  document.querySelectorAll(".menu button").forEach(b => b.classList.toggle("active", b.dataset.go === id));
  closeMenu();
  if (scrollId && TOPICS.includes(scrollId)) {
    showTopic(scrollId);
    window.scrollTo({ top: 0 });
  } else if (scrollId) {
    const el = document.getElementById(scrollId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollTo({ top: 0 });
  }
}

document.addEventListener("click", e => {
  const t = e.target.closest("[data-go]");
  if (t) go(t.dataset.go, t.dataset.scroll);
});

/* =====================================================
   DASHBOARD: ilustrasi koneksi protokol
   ===================================================== */
(function heroArt() {
  const node = (x, y, label) => `<circle cx="${x}" cy="${y}" r="36" fill="#fff" stroke="#63a6df" stroke-width="4"/><text x="${x}" y="${y + 6}" text-anchor="middle" fill="#4966dd" font-size="15" font-weight="700" font-family="Segoe UI,Arial,sans-serif">${label}</text>`;
  $("#heroArt").innerHTML = `<svg viewBox="0 0 430 330" role="img" aria-label="Ilustrasi koneksi Model OSI dan protokol jaringan">
    <g stroke="#4966dd" stroke-width="3" stroke-dasharray="8 9" opacity=".9"><path d="M215 165 L75 50"/><path d="M215 165 L355 50"/><path d="M215 165 L75 280"/><path d="M215 165 L355 280"/></g>
    ${node(75,50,"HTTP")}${node(355,50,"TCP")}${node(75,280,"DNS")}${node(355,280,"IP")}
    <circle cx="215" cy="165" r="58" fill="#4966dd"/><text x="215" y="174" text-anchor="middle" fill="#fff" font-size="27" font-weight="800" font-family="Segoe UI,Arial,sans-serif">OSI</text>
  </svg>`;
})();

/* =====================================================
   MATERI A: alur data
   ===================================================== */
(function flow() {
  const chip = l => `<div class="chip" style="--c:${hue(l.n)}">${l.n}. ${l.name}</div>`;
  $("#osiFlow").innerHTML =
    `<div class="fh">Pengirim</div><div></div><div class="fh">Penerima</div>` +
    [...LAYERS].reverse().map(l =>
      `${chip(l)}<div class="ar" aria-hidden="true">${l.n === 1 ? "⇄" : "┄"}</div>${chip(l)}`).join("");
})();

/* =====================================================
   MATERI B: layer OSI interaktif
   ===================================================== */
const stack = $("#stack"), detail = $("#detail");

stack.innerHTML = [...LAYERS].reverse().map(l =>
  `<button class="lay" data-n="${l.n}" style="--c:${hue(l.n)}" aria-pressed="false">` +
  `<b>${l.n}</b><span>${l.name}</span><small>${l.tag}</small></button>`).join("");

function showLayer(n) {
  const l = LAYERS.find(x => x.n === n);
  stack.querySelectorAll(".lay").forEach(b => {
    const on = +b.dataset.n === n;
    b.classList.toggle("on", on);
    b.setAttribute("aria-pressed", String(on));
  });
  detail.innerHTML =
    `<div class="fadein"><span class="ico">${l.ico}</span><h3>Layer ${l.n}: ${l.name}</h3>` +
    `<p>${l.desc}</p><h4>Fungsi utama</h4><ul>${l.fungsi.map(f => `<li>${f}</li>`).join("")}</ul>` +
    `<h4>Contoh terkait</h4><p>${l.contoh}</p><span class="pdu">Unit data: <b>${l.unit}</b></span></div>`;
}

stack.addEventListener("click", e => {
  const b = e.target.closest(".lay");
  if (b) showLayer(+b.dataset.n);
});
showLayer(1);

/* =====================================================
   MATERI C: kartu protokol
   ===================================================== */
$("#protoGrid").innerHTML = PROTO.map(p =>
  `<div class="card proto"><span class="proto-mark" aria-hidden="true">${p.name}</span>` +
  `<h3>${p.name}<small>${p.layer}</small></h3><div class="full">${p.full}</div>` +
  `<p>${p.arti}</p><h4>Fungsi</h4><p>${p.fungsi}</p><h4>Contoh penggunaan</h4><p>${p.contoh}</p></div>`).join("");

/* =====================================================
   KUIS AKHIR  (intro -> mengerjakan -> hasil -> pembahasan)
   ===================================================== */
const box = $("#quizBox");

/* Pengelompokan soal per topik (dipakai untuk status & rekomendasi belajar).
   max = nomor index soal terakhir di topik itu (urut sesuai array QUIZ) */
const QTOPICS = [
  { name: "Konsep Model OSI", mat: "materiA", max: 2 },
  { name: "7 Layer OSI", mat: "materiB", max: 9 },
  { name: "Protokol Jaringan", mat: "materiC", max: 99 }
];
const topicOf = i => QTOPICS.find(t => i <= t.max);

let st;
function newState() {
  return { phase: "intro", order: QUIZ.map((_, i) => i), pos: 0, sel: null, checked: false, ans: QUIZ.map(() => null), review: false };
}
function startQuiz() {
  st = newState();
  st.phase = "run";
  renderQuiz();
  window.scrollTo({ top: 0 });
}

function renderQuiz() {
  if (st.phase === "intro") return renderIntro();
  if (st.phase === "done") return renderResult();
  renderQuestion();
}

function renderIntro() {
  box.innerHTML =
    `<div class="card qintro fadein"><svg class="ico" aria-hidden="true"><use href="#icon-clipboard"/></svg><h2>Kuis Evaluasi</h2>` +
    `<p>${QUIZ.length} soal pilihan ganda seputar Model OSI dan Protokol Jaringan. Jawab satu per satu, nilai dihitung otomatis di akhir.</p>` +
    `<button class="btn" id="qStart">Mulai Kuis</button></div>`;
}

function renderQuestion() {
  const idx = st.order[st.pos], q = QUIZ[idx], n = st.order.length;
  const retry = n !== QUIZ.length;
  const opts = q.o.map((t, k) => {
    let cls = "opt";
    if (st.checked) { if (k === q.a) cls += " ok"; else if (k === st.sel) cls += " no"; }
    else if (k === st.sel) cls += " sel";
    return `<button class="${cls}" data-k="${k}" ${st.checked ? "disabled" : ""}><span class="L">${LETTER[k]}</span><span>${t}</span></button>`;
  }).join("");

  let fb = "";
  if (st.checked) {
    const ok = st.sel === q.a;
    fb = `<div class="fb ${ok ? "ok" : "no"}"><b>${ok ? "✔ Benar!" : "✖ Kurang tepat."}</b> ${q.e}</div>`;
  }
  const last = st.pos === n - 1;
  const btn = st.checked
    ? `<button class="btn" id="qNext">${last ? "Lihat Hasil" : "Selanjutnya"}</button>`
    : "";
  const answered = st.order.filter(i => st.ans[i] !== null).length;
  const correct = st.order.filter(i => st.ans[i] === QUIZ[i].a).length;

  box.innerHTML =
    `<div class="quiz-ws fadein"><div class="card qcard">` +
    `<div class="qmeta">${retry ? "Ulangi soal salah · " : ""}Soal ${st.pos + 1} dari ${n}</div>` +
    `<div class="prog" role="progressbar" aria-valuemin="0" aria-valuemax="${n}" aria-valuenow="${st.pos + 1}"><div style="width:${((st.pos + (st.checked ? 1 : 0)) / n) * 100}%"></div></div>` +
    `<div class="qtext">${q.q}</div><div class="opts">${opts}</div>${fb}${btn ? `<div class="qact">${btn}</div>` : ""}</div></div>`;
}

function renderResult() {
  const total = QUIZ.length;
  const benar = QUIZ.filter((q, i) => st.ans[i] === q.a).length;
  const salah = total - benar;
  const nilai = Math.round((benar / total) * 100);

  /* rekomendasi belajar berdasarkan topik dengan salah terbanyak */
  const wrong = {};
  QUIZ.forEach((q, i) => { if (st.ans[i] !== q.a) { const t = topicOf(i).name; wrong[t] = (wrong[t] || 0) + 1; } });
  let reco;
  if (!salah) {
    reco = `<p>Hebat, semua jawabanmu benar! Kamu sudah siap melanjutkan.</p>`;
  } else {
    const t = QTOPICS.slice().sort((a, b) => (wrong[b.name] || 0) - (wrong[a.name] || 0))[0];
    reco = `<p>Salahmu paling banyak ada di topik <b>${t.name}</b> (${wrong[t.name]} soal). Pelajari lagi materi tersebut sebelum mengulangi kuis.</p>` +
           `<button class="btn line" data-go="materi" data-scroll="${t.mat}">Buka materi ${t.name}</button>`;
  }

  let html =
    `<div class="card rcard fadein"><h2>Quiz Selesai!</h2><div class="score">${nilai}</div><div class="qmeta">Nilai</div>` +
    `<div class="stats"><div class="stat ok"><b>${benar}</b>Benar</div><div class="stat no"><b>${salah}</b>Salah</div><div class="stat"><b>${nilai}%</b>Persentase</div></div>` +
    `<div class="reco"><h3>Rekomendasi Belajar</h3>${reco}</div>` +
    `<div class="ract"><button class="btn" id="rReview">${st.review ? "Sembunyikan Pembahasan" : "Lihat Pembahasan"}</button>` +
    `<button class="btn line" id="rRetry">Ulangi Kuis</button><button class="btn line" id="rHome">Kembali ke Dashboard</button></div></div>`;

  if (st.review) {
    html += `<div class="review">` + QUIZ.map((q, i) => {
      const u = st.ans[i], ok = u === q.a;
      return `<div class="card ri ${ok ? "ok" : "no"}"><span class="tag">${ok ? "✔ Benar" : "✖ Salah"}</span>` +
        `<p class="q">Soal ${i + 1}. ${q.q}</p>` +
        `<p><b>Jawaban Anda:</b> ${LETTER[u]}. ${q.o[u]}</p>` +
        `<p><b>Jawaban benar:</b> ${LETTER[q.a]}. ${q.o[q.a]}</p>` +
        `<p><b>Pembahasan:</b> ${q.e}</p></div>`;
    }).join("") + `</div>`;
  }
  box.innerHTML = html;
}

/* Pilihan langsung diperiksa saat diklik; tombol "Jawab" tidak diperlukan. */
box.addEventListener("click", e => {
  const opt = e.target.closest(".opt");
  if (!opt || st.phase !== "run" || st.checked) return;

  st.sel = +opt.dataset.k;
  st.ans[st.order[st.pos]] = st.sel;
  st.checked = true;
  renderQuiz();

  const q = QUIZ[st.order[st.pos]];
  const correct = st.sel === q.a;
  const feedback = $(".fb");
  if (feedback) {
    feedback.setAttribute("role", "status");
    feedback.innerHTML = correct
      ? `<b>✓ Jawaban kamu benar!</b><span class="fb-explain"><strong>Penjelasan:</strong> ${q.e}</span>`
      : `<b>✕ Jawaban kamu kurang tepat.</b><span class="fb-answer">Jawaban yang benar: <strong>${LETTER[q.a]}. ${q.o[q.a]}</strong></span><span class="fb-explain"><strong>Penjelasan:</strong> ${q.e}</span>`;
  }
  const note = $(".qs-note");
  if (note) note.textContent = "Hasil dan pembahasan sudah ditampilkan. Lanjut ke soal berikutnya.";
  e.stopImmediatePropagation();
}, true);

box.addEventListener("click", e => {
  if (e.target.closest("#qStart") || e.target.closest("#rRetry")) return startQuiz();

  const opt = e.target.closest(".opt");
  if (opt && !st.checked) { st.sel = +opt.dataset.k; return renderQuiz(); }

  if (e.target.closest("#qNext")) {
    st.pos++; st.sel = null; st.checked = false;
    if (st.pos >= st.order.length) { st.phase = "done"; st.review = false; markDone("K"); window.scrollTo({ top: 0 }); }
    return renderQuiz();
  }
  if (e.target.closest("#rReview")) { st.review = !st.review; renderQuiz(); if (st.review) { const rv = $(".review"); if (rv) rv.scrollIntoView({ behavior: "smooth" }); } return; }
  if (e.target.closest("#rHome")) { go("dashboard"); }
});

st = newState();
renderQuiz();

/* =====================================================
   CEK PEMAHAMAN PER MATERI + PROGRESS BELAJAR
   (ubah soal cek pemahaman di CHECKS, tahap progress di STEPS)
   ===================================================== */
const CHECKS = {
  A: [
    { q: "Model OSI membagi proses komunikasi jaringan menjadi berapa layer?", o: ["5 layer", "7 layer", "4 layer", "9 layer"], a: 1,
      e: "Model OSI terdiri dari 7 layer, dari Physical sampai Application." }
  ],
  B: [
    { q: "Di sisi pengirim, data bergerak dengan urutan layer...", o: ["Physical → Application", "Application → Physical", "Network → Session", "Transport → Presentation"], a: 1,
      e: "Data turun dari Application sampai Physical di pengirim, lalu naik lagi di penerima." }
  ],
  C: [
    { q: "Protokol transport mana yang lebih cocok untuk video call yang butuh kecepatan?", o: ["TCP", "UDP", "FTP", "SMTP"], a: 1,
      e: "UDP lebih cepat karena tidak memakai proses koneksi dan jaminan yang rumit." }
  ]
};

const STEPS = [
  { id: "A", label: "Pengertian OSI", go: "materi", sc: "materiA" },
  { id: "B", label: "7 Layer OSI", go: "materi", sc: "materiB" },
  { id: "C", label: "Protokol Jaringan", go: "materi", sc: "materiC" },
  { id: "K", label: "Kuis Akhir", go: "kuis", sc: "" }
];

let chkState = {};
let prog = {};
try { prog = JSON.parse(localStorage.getItem("osiProgress")) || {}; } catch (err) { prog = {}; }
function saveProg() { try { localStorage.setItem("osiProgress", JSON.stringify(prog)); } catch (err) {} }

function renderProgress() {
  const done = STEPS.filter(s => prog[s.id]).length;
  const pct = Math.round((done / STEPS.length) * 100);
  $("#ring").style.setProperty("--p", pct + "%");
  $("#ringTxt").textContent = pct + "%";
  $("#progSub").textContent = done === STEPS.length ? "Semua tahap selesai. Mantap!" : `${done} dari ${STEPS.length} tahap selesai`;
  $("#steps").innerHTML = STEPS.map((s, i) =>
    `<li class="${prog[s.id] ? "done" : ""}"><button data-go="${s.go}"${s.sc ? ` data-scroll="${s.sc}"` : ""}>` +
    `<span class="dot">${prog[s.id] ? "✔" : i + 1}</span>${s.label}</button></li>`).join("");
}

function markDone(id) {
  prog[id] = true;
  saveProg();
  renderProgress();
}

function renderCheck(key) {
  const qs = CHECKS[key];
  const s = chkState[key] || (chkState[key] = { ans: qs.map(() => null) });
  const finished = s.ans.every(v => v !== null);
  const benar = s.ans.filter((v, i) => v === qs[i].a).length;

  $("#check" + key).innerHTML =
    `<div class="card chk"><h3>🧠 Cek Pemahaman</h3>` +
    qs.map((q, i) => {
      const u = s.ans[i];
      const opts = q.o.map((t, k) => {
        let cls = "copt";
        if (u !== null) { if (k === q.a) cls += " ok"; else if (k === u) cls += " no"; }
        return `<button class="${cls}" data-key="${key}" data-i="${i}" data-k="${k}" ${u !== null ? "disabled" : ""}><b>${LETTER[k]}.</b>${t}</button>`;
      }).join("");
      const fb = u === null ? "" : `<div class="fb ${u === q.a ? "ok" : "no"}"><b>${u === q.a ? "✔ Benar!" : "✖ Kurang tepat."}</b> ${q.e}</div>`;
      return `<div class="cq"><p class="cqt">${i + 1}. ${q.q}</p><div class="copts">${opts}</div>${fb}</div>`;
    }).join("") +
    (finished
      ? `<div class="csum"><span>Skor: ${benar}/${qs.length} ${benar === qs.length ? "🎉 Kamu sudah paham materi ini!" : "· Baca materinya lagi, lalu ulangi."}</span>` +
        `<button class="btn line cretry" data-key="${key}">Ulangi Cek</button></div>`
      : "") +
    `</div>`;
}

document.addEventListener("click", e => {
  const o = e.target.closest(".copt");
  if (o) {
    const key = o.dataset.key, i = +o.dataset.i, s = chkState[key];
    if (s && s.ans[i] === null) {
      s.ans[i] = +o.dataset.k;
      renderCheck(key);
      if (s.ans.every(v => v !== null)) markDone(key);
    }
    return;
  }
  const r = e.target.closest(".cretry");
  if (r) { delete chkState[r.dataset.key]; renderCheck(r.dataset.key); }
});

/* Video: YouTube tidak bisa dideteksi selesai ditonton, jadi pakai tombol tandai */
const vBtn = $("#videoDone");
function renderVideoBtn() { vBtn.textContent = prog.V ? "✔ Video sudah ditandai selesai" : "Tandai video selesai"; }
vBtn?.addEventListener("click", () => { markDone("V"); renderVideoBtn(); });

$("#resetProg").addEventListener("click", () => {
  prog = {}; chkState = {};
  saveProg();
  Object.keys(CHECKS).forEach(renderCheck);
  renderProgress();
});

Object.keys(CHECKS).forEach(renderCheck);
renderProgress();
