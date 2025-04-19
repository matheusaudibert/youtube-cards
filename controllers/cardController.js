const {
  fetchVideoData,
  fetchThumbnail,
} = require("../services/youtubeService");
const {
  breakTitleIntoLines,
  formatDuration,
  formatViews,
  formatTimestamp,
} = require("../utils/formatters");
const {
  generateErrorSVG,
  generateYoutubeCardSVG,
} = require("../utils/svgGenerator");

async function generateYoutubeCard(req, res) {
  const {
    theme,
    background_color,
    title_color,
    stats_color,
    max_title_lines,
    show_duration,
    border_radius,
    width,
  } = req.query;

  const { id } = req.params;

  console.log("Video ID:", id);
  console.log("Query parameters:", req.query);

  if (!id) {
    res.setHeader("Content-Type", "image/svg+xml");
    return res.send(generateErrorSVG("MISSING VIDEO ID"));
  }

  let maxTitleLines = 1;
  if (max_title_lines) {
    maxTitleLines = parseInt(max_title_lines);
    if (isNaN(maxTitleLines) || maxTitleLines <= 0) {
      maxTitleLines = 1;
    }
  }

  const shouldShowDuration = show_duration === "true";

  let borderRadius = 5;
  if (border_radius) {
    const parsedRadius = parseInt(border_radius);
    if (!isNaN(parsedRadius)) {
      if (parsedRadius > 25) {
        borderRadius = 25;
      } else if (parsedRadius < 0) {
        borderRadius = 0;
      } else {
        borderRadius = parsedRadius;
      }
    }
  }

  let cardWidth = 250;
  if (width) {
    const parsedWidth = parseInt(width);
    if (!isNaN(parsedWidth)) {
      cardWidth = Math.max(250, Math.min(1000, parsedWidth));
    }
  }

  try {
    const videoData = await fetchVideoData(id);

    if (!videoData) {
      res.setHeader("Content-Type", "image/svg+xml");
      return res.send(generateErrorSVG("404 VIDEO NOT FOUND"));
    }

    const thumbnailBase64 = await fetchThumbnail(id);

    const themes = {
      dark: {
        backgroundColor: "#0f0f0f",
        titleColor: "#ffffff",
        statsColor: "#dedede",
      },
      light: {
        backgroundColor: "#ffffff",
        titleColor: "#000000",
        statsColor: "#555555",
      },
      github: {
        backgroundColor: "#0d1117",
        titleColor: "#ffffff",
        statsColor: "#dedede",
      },
    };

    const selectedTheme = themes[theme] || themes.github;

    function formatHexColor(color) {
      if (!color) return null;

      if (color.startsWith("#")) {
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color) ? color : null;
      }

      const colorWithHash = `#${color}`;
      return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(colorWithHash)
        ? colorWithHash
        : null;
    }

    const backgroundColor =
      formatHexColor(background_color) || selectedTheme.backgroundColor;
    const titleColor = formatHexColor(title_color) || selectedTheme.titleColor;
    const statsColor = formatHexColor(stats_color) || selectedTheme.statsColor;

    // Layout settings
    const titlePadding = 10;
    const lineHeight = 20;
    const imageHeight = Math.round((cardWidth / 16) * 9);
    const textAreaHeight = 80;
    const charWidth = 7.5;

    const availableWidth = cardWidth - titlePadding * 2 - 20; // 20px offset
    const charsPerLine = Math.floor(availableWidth / charWidth);

    const titleLines = breakTitleIntoLines(
      videoData.title,
      charsPerLine,
      maxTitleLines
    );

    // Calculate dimensions
    const extraHeight = (titleLines.length - 1) * lineHeight;
    const totalHeight = imageHeight + textAreaHeight + extraHeight - 1;

    const svg = generateYoutubeCardSVG({
      videoData,
      thumbnailBase64,
      cardWidth,
      totalHeight,
      imageHeight,
      backgroundColor,
      titleColor,
      statsColor,
      borderRadius,
      shouldShowDuration,
      titleLines,
      titlePadding,
      lineHeight,
      formatDuration,
      formatViews,
      formatTimestamp,
    });

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(svg);
  } catch (error) {
    console.error(error);
    res.setHeader("Content-Type", "image/svg+xml");
    return res.send(generateErrorSVG("500 SERVER ERROR"));
  }
}

module.exports = {
  generateYoutubeCard,
};
