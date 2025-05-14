import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorToast from "./ErrorToast";
import "./SignUpForm.scss";
import XuoPng from "../../assets/xuo.png";
import XuoBackgroundVid from "../../assets/xuovideobg.mp4";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
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
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        });

        const jsonData = await res.json();

        if (!res.ok) {
          setToastErrors([jsonData.message || "Erro ao cadastrar."]);
          return;
        }

        navigate("/login");
      } catch (error) {
        setToastErrors(["Erro no servidor."]);
      }
    }
  };

  return (
    <div className="cmp-register_container">
      <ErrorToast messages={toastErrors} onClose={() => setToastErrors([])} />

      <form className="cmp-register_container_form" onSubmit={handleSubmit}>
        <img src={XuoPng} alt="logo" className="cmp-register_container_form_logo" />

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="cmp-register_container_form_textinput"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="cmp-register_container_form_textinput"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="cmp-register_container_form_textinput"
          value={formData.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirme Password"
          className="cmp-register_container_form_textinput"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button type="submit">SIGN UP</button>

        <div className="cmp-register_container_form_footer">
          <p>
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>
        </div>
      </form>

      <video autoPlay muted loop playsInline className="cmp-register_video-bg">
        <source src={XuoBackgroundVid} type="video/mp4" />
      </video>
    </div>
  );
};

export default SignUpForm;