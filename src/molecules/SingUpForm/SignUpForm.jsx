import { useState } from "react";
import { Link } from "react-router-dom";
import ErrorToast from "./ErrorToast";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [toastErrors, setToastErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errors = [];

    if (!formData.username.trim()) errors.push("Username é obrigatório.");
    if (!formData.email.trim()) {
      errors.push("Email é obrigatório.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push("Email inválido.");
    }

    if (!formData.password) {
      errors.push("Senha é obrigatória.");
    } else if (formData.password.length < 6) {
      errors.push("A senha deve ter no mínimo 6 caracteres.");
    }

    if (!formData.confirmPassword) {
      errors.push("Confirmação da senha é obrigatória.");
    } else if (formData.password !== formData.confirmPassword) {
      errors.push("As senhas não coincidem.");
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (validationErrors.length > 0) {
      setToastErrors(validationErrors);
    } else {
      setToastErrors([]);
      try {
        const res = await fetch("https://xuoapi.vercel.app/api/v1/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        const jsonData = await res.json();

        if (!res.ok) {
          // Erros do servidor (ex: 400, 401, 500...)
          setToastErrors(jsonData.message || "Erro ao cadastrar.");
        }
        setToastErrors([]);
      } catch (error) {
        setToastErrors("Erro no servido.");
        setToastErrors([]);
      }
    }
  };

  return (
    <div>
      <ErrorToast messages={toastErrors} onClose={() => setToastErrors([])} />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirme Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button type="submit">Sign Up</button>
      </form>

      <div>
        <p>Have an account already?</p>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default SignUpForm;
