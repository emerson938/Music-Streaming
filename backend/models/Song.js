const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
    {
        title : {
            type: String,
            required: true
        },
        artist: {
            type: String,
            required: true
        },
        album: {
            type: String
        },
        audioUrl: {
            type: String,
            required: true
        },
        coverImage: {
            type: String
        },
        duration: {
            type: Number
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Song = mongoose.model("Song", songSchema);

module.exports = Song;