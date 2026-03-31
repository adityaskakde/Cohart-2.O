const songModel = require("../models/song.model");
const id3 = require("node-id3");
const storageService = require("../services/storageService");

async function uploadSong(req, res) {
  const songBuffer = req.file.buffer;
  const { mood } = req.body;

  const tags = id3.read(req.file.buffer);

  const [songFile, posterFile] = await Promise.all([
    storageService.uploadFile({
      buffer: songBuffer,
      fileName: tags.title + ".mp3",
      folder: "cohort-2/moodify/songs",
    }),
    storageService.uploadFile({
      buffer: tags.image.imageBuffer,
      fileName: tags.title + ".jpg",
      folder: "cohort-2/moodify/posters",
    }),
  ]);

  const song = await songModel.create({
    title: tags.title,
    url: songFile.url,
    posterUrl: posterFile.url,
    mood: mood,
  });
  res.status(201).json({
    message: "Song uploaded successfully",
    song,
  });
}

async function getAllSongs(req, res) {
    const { mood } = req.query

    const songs = await songModel.find({
        mood     })
    res.status(200).json({
        message: "Songs fetched successfully",
        songs
    })
    
}
module.exports = {
  uploadSong,
    getAllSongs
};
