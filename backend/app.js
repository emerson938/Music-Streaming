const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/User"); // 👈 corrigido

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// conectar ao banco
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend funcionando!");
});

app.get("/create-user", async (req, res) => {
    try {
        const user = await User.create({
            name: "Teste",
            email: "teste@email.com",
            password: "123456"
        });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});