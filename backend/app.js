const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const musicRoutes = require("./routes/musicRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("uploads")); // Servir arquivos de upload
app.use("/uploads", express.static("uploads")); // Rota para acessar os uploads

// rotas
const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);

app.use("/api/music", musicRoutes);

app.get("/", (req, res) => {
    res.send("Backend funcionando!");
});

// rota de teste (opcional)
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

app.get("/sobre", async (req, res) => {
    res.send("<h1>Sobre Nós</h1><p>Bem-vindo à nossa aplicação!</p>");
});



connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Erro ao conectar no banco:", err);
    });