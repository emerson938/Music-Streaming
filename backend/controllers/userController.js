// controllers/userController.js

// Criar usuário
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validação simples
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }

    // aqui depois você conecta com o banco (MongoDB)
    const user = {
      name,
      email,
      password
    };

    res.status(201).json({
      message: "Usuário criado com sucesso",
      user
    });

  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

// exportar funções
module.exports = {
  registerUser
};