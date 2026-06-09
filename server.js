const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("."));

const DB_FILE = "data.json";

function loadData() {
  if (!fs.existsSync(DB_FILE)) {
    return {
      show: {},
      artists: [],
      slots: [],
      msgs: [],
      accounts: [{
        id: "admin",
        username: "admin",
        password: "admin",
        display: "Administrator",
        role: "Admin",
        level: "admin"
      }],
      shifts: []
    };
  }

  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

function saveData(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

app.get("/api/state", (req, res) => {
  res.json(loadData());
});

app.post("/api/state", (req, res) => {
  saveData(req.body);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
