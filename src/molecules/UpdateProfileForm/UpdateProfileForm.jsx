import { useEffect, useState } from "react";

const UpdateProfileForm = () => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);

  useEffect(() => {
    setUserId(sessionStorage.getItem("id") || null);
  }, []);

  const handleUsernameBlur = async () => {
    if (!username) return;

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/user/usernameAvailable",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }), // agora envia o JSON correto
        }
      );

      const data = await response.json();

      if (data.available) {
        console.log("Username disponível");
        setIsUsernameAvailable(true);
      } else {
        console.log("Username já em uso");
        setIsUsernameAvailable(false);
      }
    } catch (error) {
      console.error("Erro ao verificar username:", error);
      setIsUsernameAvailable(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userId || !isUsernameAvailable) {
      console.log("Usuário inválido ou username não disponível");
      return;
    }

    const data = {
      id: userId,
      username: username,
      descricao: descricao,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/user/updateInfo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log("Perfil atualizado com sucesso:", result);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onBlur={handleUsernameBlur}
        required
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        rows="4"
        cols="50"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        required
      ></textarea>

      <button type="submit" disabled={!isUsernameAvailable}>
        Submit
      </button>
    </form>
  );
};

export default UpdateProfileForm;
