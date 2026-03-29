require("dotenv").config();

const PORT = process.env.PORT;

const express = require("express");
const app = express();

app.get("/", (req, res) =>{
    res.send("Backend funcionando!");
});

app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta ${PORT}`);
});