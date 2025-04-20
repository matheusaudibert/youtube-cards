const axios = require("axios");

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

async function fetchVideoData(videoId) {
  if (!YOUTUBE_API_KEY) {
    console.error("Erro: Chave da API do YouTube não configurada");
    return null;
  }

  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails,liveStreamingDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`;

  try {
    const response = await axios.get(url);

    if (response.data.items.length === 0) {
      return null;
    }

    const video = response.data.items[0];
    const isLive = video.contentDetails.duration === "P0D";

    return {
      title: video.snippet.title,
      views:
        isLive &&
        video.liveStreamingDetails &&
        video.liveStreamingDetails.concurrentViewers
          ? parseInt(
              video.liveStreamingDetails.concurrentViewers
            ).toLocaleString()
          : parseInt(video.statistics.viewCount).toLocaleString(),
      duration: parseISO8601Duration(video.contentDetails.duration),
      publishedAt: video.snippet.publishedAt,
      isLive: isLive,
    };
  } catch (error) {
    console.error("Error fetching video data:", error.message);
    if (error.response) {
      console.error("API response data:", error.response.data);
    }
    return null;
  }
}

async function fetchThumbnail(videoId) {
  const cleanVideoId = videoId.split(/[&?]/)[0];

  try {
    // Usar thumbnails de baixa qualidade (mqdefault ou default)
    const response = await axios.get(
      `https://img.youtube.com/vi/${cleanVideoId}/mqdefault.jpg`,
      {
        responseType: "arraybuffer",
      }
    );

    return Buffer.from(response.data).toString("base64");
  } catch (error) {
    try {
      // Fallback para qualidade ainda mais baixa
      const response = await axios.get(
        `https://img.youtube.com/vi/${cleanVideoId}/default.jpg`,
        {
          responseType: "arraybuffer",
        }
      );

      return Buffer.from(response.data).toString("base64");
    } catch (error) {
      console.error("Error fetching thumbnail:", error);
      return null;
    }
  }
}

function parseISO8601Duration(duration) {
  if (duration === "P0D") {
    return "LIVE";
  }

  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;
  return hours * 3600 + minutes * 60 + seconds;
}

module.exports = {
  fetchVideoData,
  fetchThumbnail,
  parseISO8601Duration,
};
