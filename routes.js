const express = require("express");
const path = require("path");
const { generateYoutubeCard } = require("./controllers/cardController");

const router = express.Router();

// Rotas para arquivos estáticos
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

router.get("/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "public/style.css"));
});

router.get("/script.js", (req, res) => {
  res.sendFile(path.join(__dirname, "public/script.js"));
});

// Rota da API para gerar cards do YouTube
router.get("/api", generateYoutubeCard);

module.exports = router;
