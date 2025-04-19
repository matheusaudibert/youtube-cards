// Break title into multiple lines
function breakTitleIntoLines(title, maxCharsPerLine, maxLines) {
  const words = title.split(" ");
  const lines = [];
  let currentLine = "";
  let remainingWords = [...words]; // Copy of words for tracking remaining words

  // If maxLines is 1, we return direct truncation
  if (maxLines === 1) {
    let line = "";

    for (const word of words) {
      const testLine = line + (line ? " " : "") + word;
      // Check if adding the current word keeps the line within the limit
      if (testLine.length <= maxCharsPerLine) {
        line = testLine;
      } else {
        // If adding the word exceeds the limit, we add ellipsis and return
        return [line + "..."];
      }
    }

    return [line]; // Return complete line without truncation if it fits
  }

  // For multiple lines
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    // Check if adding the current word keeps the line within the limit
    if (
      (currentLine + (currentLine ? " " : "") + word).length <= maxCharsPerLine
    ) {
      currentLine += (currentLine ? " " : "") + word;
      remainingWords.shift(); // Remove word that was added to current line
    } else {
      // If we're already at the last allowed line
      if (lines.length === maxLines - 1) {
        // If we have a non-empty current line and remaining words, add ellipsis
        if (currentLine && remainingWords.length > 0) {
          lines.push(currentLine + "...");
        } else {
          lines.push(currentLine);
        }
        return lines;
      }

      lines.push(currentLine);
      currentLine = word;
      remainingWords.shift(); // Remove word that was added to new line
    }
  }

  // If we get here, it's because all words fit within the lines
  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

// Format duration in minutes:seconds
function formatDuration(duration) {
  if (duration === "LIVE") {
    return "LIVE";
  }

  const mins = Math.floor(duration / 60);
  const secs = duration % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// Format views count (K, M)
function formatViews(views) {
  const num = parseInt(views.replace(/,/g, ""));

  if (num >= 1000 && num < 10000) {
    return `${(num / 1000).toFixed(1)}K`;
  } else if (num >= 10000 && num < 1000000) {
    return `${Math.floor(num / 1000)}K`;
  } else if (num >= 1000000) {
    return `${Math.floor(num / 1000000)}M`;
  }

  return num.toString();
}

// Format timestamp as "X time ago"
function formatTimestamp(publishedAt) {
  const date = new Date(publishedAt);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return `${diff} second${diff > 1 ? "s" : ""} ago`;
  if (diff < 3600)
    return `${Math.floor(diff / 60)} minute${
      Math.floor(diff / 60) > 1 ? "s" : ""
    } ago`;
  if (diff < 86400)
    return `${Math.floor(diff / 3600)} hour${
      Math.floor(diff / 3600) > 1 ? "s" : ""
    } ago`;
  if (diff < 2592000)
    return `${Math.floor(diff / 86400)} day${
      Math.floor(diff / 86400) > 1 ? "s" : ""
    } ago`;
  if (diff < 31536000)
    return `${Math.floor(diff / 2592000)} month${
      Math.floor(diff / 2592000) > 1 ? "s" : ""
    } ago`;
  return `${Math.floor(diff / 31536000)} year${
    Math.floor(diff / 31536000) > 1 ? "s" : ""
  } ago`;
}

module.exports = {
  breakTitleIntoLines,
  formatDuration,
  formatViews,
  formatTimestamp,
};
