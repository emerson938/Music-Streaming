const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const authMiddleware = require("../middlewares/authMIddleware");
const Song = require("../models/Song");
const streamMusic = require("../controllers/musicController");
const fs = require("fs");
const path = require("path");


router.get("/stream/:id", streamMusic);

// Upload de música
router.post("/upload", authMiddleware, upload.single("music"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const { title, artist, album } = req.body;

        if (!title || !artist) {
            return res.status(400).json({ message: "Title and artist are required" });
        }

        // Salvar no banco de dados
        const newSong = await Song.create({
            title,
            artist,
            album,
            audioUrl: `/uploads/${req.file.filename}`,
            userId: req.user.id
        });

        res.json({
            message: "Music uploaded successfully",
            song: newSong
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});






module.exports = router;

// Atualizar música
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        
        if (!song) {
            return res.status(404).json({ message: "Song not found" });
        }

        // Verificar se o usuário é o dono
        if (song.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to update this song" });
        }

        const { title, artist, album } = req.body;

        // Atualizar campos
        if (title) song.title = title;
        if (artist) song.artist = artist;
        if (album) song.album = album;

        await song.save();

        res.json({
            message: "Song updated successfully",
            song
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
