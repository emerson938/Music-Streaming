const multer = require("multer");
const path = require("path");

// Configuração de armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // pasta onde salva
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

// Filtro de arquivos (aceita apenas MP3)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "audio/mpeg") {
    cb(null, true);
  } else {
    cb(new Error("Only MP3 files allowed"), false);
  }
};

// Configuração final do upload
const upload = multer({
  storage,
  fileFilter
});

module.exports = upload;