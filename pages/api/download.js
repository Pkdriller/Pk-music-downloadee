import ytdl from "ytdl-core";

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).send("Missing video id");

  try {
    const info = await ytdl.getInfo(id);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio', filter: 'audioonly' });
    if (!format) return res.status(404).send("No audio found");

    res.setHeader('Content-Disposition', `attachment; filename="pkmusic-${id}.mp3"`);
    res.setHeader('Content-Type', 'audio/mpeg');
    ytdl(id, { format, quality: 'highestaudio', filter: 'audioonly' }).pipe(res);
  } catch (err) {
    res.status(500).send("Could not download audio: " + err.message);
  }
  }
