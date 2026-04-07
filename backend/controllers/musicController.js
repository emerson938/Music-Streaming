import fs from "fs";
import path from "path";

export const streamMusic = (req, res) => {
  const filePath = path.resolve("uploads/music.mp3"); // caminho da música

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;

  const range = req.headers.range;

  if (!range) {
    return res.status(400).send("Range header required");
  }

  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, fileSize - 1);

  const contentLength = end - start + 1;

  const headers = {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "audio/mpeg",
  };

  res.writeHead(206, headers);

  const stream = fs.createReadStream(filePath, { start, end });
  stream.pipe(res);
};