// Generate error SVG with 8-bit sad face
function generateErrorSVG(message = "404 NOT FOUND") {
  const width = 250;
  const height = 220;
  const pixelSize = 10;

  // Matrix to draw 8-bit sad face (1=pixel, 0=transparent)
  const sadFacePixels = [
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
  ];

  let facePixelsSVG = "";
  const startX = Math.floor((width - sadFacePixels[0].length * pixelSize) / 2);
  const startY = 50;

  // Generate SVG for each face pixel
  sadFacePixels.forEach((row, rowIndex) => {
    row.forEach((pixel, colIndex) => {
      if (pixel === 1) {
        facePixelsSVG += `<rect x="${startX + colIndex * pixelSize}" y="${
          startY + rowIndex * pixelSize
        }" width="${pixelSize}" height="${pixelSize}" fill="#ffffff" />`;
      }
    });
  });

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="${width}" height="${height}" fill="#141414" rx="8" />
      ${facePixelsSVG}
      <text x="${width / 2}" y="${
    startY + sadFacePixels.length * pixelSize + 40
  }" 
            font-family="monospace" font-size="18" fill="#ffffff" 
            text-anchor="middle" font-weight="bold">
        ${message}
      </text>
    </svg>
  `;
}

// Escapar caracteres especiais para uso seguro no SVG
function escapeHTML(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Generate YouTube card SVG
function generateYoutubeCardSVG(options) {
  const {
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
  } = options;

  const { duration, views, publishedAt, isLive } = videoData;

  // Duration settings
  const durationFontSize = 13;
  const durationLiveFontSize = 11;
  const durationWidth = 41;
  const durationHeight = 18;
  const durationRadius = 2;
  const durationOffset = 49;

  // Text positions
  const titleBaselineY = imageHeight + 9;
  const statsBaselineY = totalHeight - 25;
  const durationY = imageHeight - durationHeight - 5;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${cardWidth}" height="${totalHeight}" viewBox="0 0 ${cardWidth} ${totalHeight}">
      <defs>
        <clipPath id="image-clip">
          <path d="M0,${borderRadius} 
                  a${borderRadius},${borderRadius} 0 0 1 ${borderRadius},-${borderRadius} 
                  h${cardWidth - 2 * borderRadius} 
                  a${borderRadius},${borderRadius} 0 0 1 ${borderRadius},${borderRadius} 
                  v${imageHeight - borderRadius} 
                  h-${cardWidth} 
                  z" />
        </clipPath>
      </defs>
      <rect id="rect" rx="${borderRadius}" width="${cardWidth}" height="${totalHeight}" fill="${backgroundColor}"/>
      ${
        thumbnailBase64
          ? `<image y="-1" width="${cardWidth}" height="${imageHeight}" 
  clip-path="url(#image-clip)" 
  preserveAspectRatio="xMidYMid slice"
  xlink:href="data:image/jpeg;base64,${thumbnailBase64}"/>`
          : `<rect y="-1" width="${cardWidth}" height="${imageHeight}" clip-path="url(#image-clip)" fill="#333"/>`
      }
      ${
        shouldShowDuration
          ? duration === "LIVE"
            ? `
          <g transform="translate(${cardWidth - durationOffset}, ${durationY})">
            <rect x="0" y="0" rx="${durationRadius}" width="${durationWidth}" height="${durationHeight}" fill="#ff000080"/>
            <text x="${durationWidth / 2}" y="${
                durationHeight / 2
              }" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="Roboto, Segoe UI, Ubuntu, Arial, sans-serif" font-weight="600" font-size="${durationLiveFontSize}px">
              LIVE
            </text>
          </g>`
            : `
          <g transform="translate(${cardWidth - durationOffset}, ${durationY})">
            <rect x="0" y="0" rx="${durationRadius}" width="${durationWidth}" height="${durationHeight}" fill="#00000080"/>
            <text x="${durationWidth / 2}" y="${
                durationHeight / 2 + 1
              }" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="Roboto, Segoe UI, Ubuntu, Arial, sans-serif" font-weight="600" font-size="${durationFontSize}px">
              ${formatDuration(duration)}
            </text>
          </g>`
          : ""
      }
      <!-- title -->
      ${titleLines
        .map(
          (line, index) => `
          <g transform="translate(${titlePadding}, ${
            titleBaselineY + index * lineHeight
          })">
            <text fill="${titleColor}" font-family="Roboto, Segoe UI, Ubuntu, Arial, sans-serif" font-weight="600" font-size="15px">
              <tspan x="0" dy="${lineHeight}px">${escapeHTML(line)}</tspan>
            </text>
          </g>`
        )
        .join("\n")}
      <!-- views + date -->
      <g transform="translate(${titlePadding}, ${statsBaselineY})">
        <text fill="${statsColor}" font-family="Roboto, Segoe UI, Ubuntu, Arial, sans-serif" font-weight="400" font-size="${13}px">
          ${
            duration === "LIVE"
              ? `${formatViews(views)} watching&#8194;•&#8194;${formatTimestamp(
                  publishedAt
                )}`
              : `${formatViews(views)} views&#8194;•&#8194;${formatTimestamp(
                  publishedAt
                )}`
          }
        </text>
      </g>
    </svg>
  `;
}

module.exports = {
  generateErrorSVG,
  generateYoutubeCardSVG,
};
