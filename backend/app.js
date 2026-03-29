const express = require("express");
app = express();

app.get("/", (req, res) =>{
    res.send("Backend funcionando!");
});

app.listen(3000, () =>{
    console.log("Servidorr rodando na porta 3000");
});