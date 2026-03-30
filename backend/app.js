require("dotenv").config();
const cors = require("cors");
const express = require("express");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) =>{
    res.send("Backend funcionando!");
});

app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta ${PORT}`);
});