import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./molecules/LoginForm/LoginForm";
import MessagePage from "./molecules/Messages/MessagePage";
import "./App.scss";
import SignUpForm from "./molecules/SingUpForm/SignUpForm";
import Layout from "./molecules/Layout/Layout";
import TestPage from "./organisms/TestPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route index path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/mensagens" element={<MessagePage />} />

        <Route path="/" element={<Layout />}>
          <Route path="/index" element={<TestPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
