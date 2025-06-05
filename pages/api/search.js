import axios from "axios";

export default async function handler(req, res) {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Missing search query" });
  const YT_API_KEY = process.env.YT_API_KEY;
  if (!YT_API_KEY) return res.status(500).json({ error: "Missing YT_API_KEY env variable" });

  try {
    const ytRes = await axios.get(
      "https://www.googleapis.com/youtube/v3/search", {
        params: {
          key: YT_API_KEY,
          part: "snippet",
          type: "video",
          maxResults: 10,
          q
        }
      }
    );
    res.json(ytRes.data);
  } catch (err) {
    res.status(500).json({ error: "YouTube API error", details: err.message });
  }
}
