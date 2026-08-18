// Servidor del Cotizador — Taller Láser
// Sirve la app web y guarda los datos en un archivo local (data/store.json).
// No necesita internet ni bases de datos externas para funcionar.

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));

const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "store.json");

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "{}");

let writeQueue = Promise.resolve();
function readStore() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch {
    return {};
  }
}
function writeStore(obj) {
  writeQueue = writeQueue.then(() =>
    fs.promises.writeFile(DATA_FILE, JSON.stringify(obj, null, 2))
  );
  return writeQueue;
}

// --- API ---
app.get("/api/kv/:key", (req, res) => {
  const store = readStore();
  const key = req.params.key;
  if (!(key in store)) return res.status(404).json({ error: "not_found" });
  res.json({ key, value: store[key] });
});

app.post("/api/kv/:key", async (req, res) => {
  const key = req.params.key;
  const { value } = req.body;
  const store = readStore();
  store[key] = value;
  await writeStore(store);
  res.json({ key, value });
});

// Copia de seguridad simple: descarga todos los datos como JSON
app.get("/api/backup", (req, res) => {
  res.setHeader("Content-Disposition", "attachment; filename=backup-taller.json");
  res.json(readStore());
});

// --- Frontend (archivos ya compilados en /public) ---
const publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir));
app.get("*", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`\n✅ Taller Láser corriendo.`);
  console.log(`   En esta PC:        http://localhost:${PORT}`);
  console.log(`   En la red local:   http://<IP-de-esta-PC>:${PORT}\n`);
});
