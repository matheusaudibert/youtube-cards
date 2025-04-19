const express = require("express");
const path = require("path");
const { generateYoutubeCard } = require("./controllers/cardController");

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

router.get("/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "public/style.css"));
});

router.get("/script.js", (req, res) => {
  res.sendFile(path.join(__dirname, "public/script.js"));
});

router.get(
  "/api/:idWithParams",
  (req, res, next) => {
    const { idWithParams } = req.params;

    let id;

    if (idWithParams.includes("?")) {
      const [videoId, queryString] = idWithParams.split("?");
      id = videoId;

      const params = new URLSearchParams(queryString);
      params.forEach((value, key) => {
        req.query[key] = value;
      });
    } else if (idWithParams.includes("&")) {
      const parts = idWithParams.split("&");
      id = parts[0];

      parts.slice(1).forEach((param) => {
        if (param.includes("=")) {
          const [key, value] = param.split("=");
          req.query[key] = value;
        }
      });
    } else {
      id = idWithParams;
    }

    req.params.id = id;
    next();
  },
  generateYoutubeCard
);

module.exports = router;
